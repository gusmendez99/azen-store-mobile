import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as actions from './search.actions';
import * as types from './search.types';
import * as schemas from './search.schemas';

import * as selectors from '../root-reducer';

const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';

function* fetchFilteredProducts(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const { query } = action.payload;

      const response = yield call(
        fetch,
        `${API_BASE_URL}/products/?search=${query}`,
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
          entities: { products },
          result,
        } = normalize(jsonResult, schemas.products);

        yield put(
          actions.completeSearchingProducts(
            products,
            result,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failSearchingProducts(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failSearchingProducts(error.message));
  }
}

export function* watchFilteredProducts() {
  yield takeEvery(
    types.SEARCH_PRODUCT_FETCH_STARTED,
    fetchFilteredProducts,
  );
}
