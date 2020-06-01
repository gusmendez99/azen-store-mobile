import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';


import * as selectors from '../root-reducer';
import * as actions from './review.actions';
import * as types from './review.types';
import * as schemas from './review.schemas';

const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';

function* fetchReviews(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const { idProduct } = action.payload;
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/reviews?product=${idProduct}`,
        {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const jsonResult = yield response.json();
        const {
          entities: { reviews },
          result,
        } = normalize(jsonResult, schemas.reviews);

        yield put(
          actions.completeFetchingReviews(
            reviews,
            result,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingReviews(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingReviews(error.message));
  }
}

export function* watchReviewsFetch() {
  yield takeEvery(
    types.FETCH_REVIEWS_STARTED,
    fetchReviews,
  );
}

function* postReview(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const { reviewData } = action.payload;
      const token = yield select(selectors.getAuthToken);
      const authUserID = yield select(selectors.getAuthUserID);

      const newReview = {...reviewData, user: authUserID}

      const response = yield call(
        fetch,
        `${API_BASE_URL}/reviews/`,
        {
          method: 'POST',
          body: JSON.stringify(newReview),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const jsonResult = yield response.json();
        yield put(actions.completePostingReview(jsonResult));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failPostingReview(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failPostingReview('Server error'));
  }
}

export function* watchPostReview() {
  yield takeEvery(
    types.POST_REVIEW_STARTED,
    postReview,
  );
}