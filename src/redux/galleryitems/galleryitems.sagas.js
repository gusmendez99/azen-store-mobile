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

import * as selectors from '../root-reducer';
import * as actions from './galleryitems.actions';
import * as types from './galleryitems.types';
import * as schemas from './galleryitems.schemas';

const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';

function* fetchGalleryItems(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const userId = yield select(selectors.getAuthUserID);
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/gallery-items?product=${action.payload.product}`,
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
          entities: { galleryItems },
          result,
        } = normalize(jsonResult, schemas.galleryItems);
        
        yield put(
          actions.completeFetchingGalleryItems(
            galleryItems,
            result,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingGalleryItems(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingGalleryItems(error.message));
  }
}

export function* watchGalleryItemsFetch() {
  yield takeEvery(
    types.GALLERYITEMS_FETCH_STARTED,
    fetchGalleryItems,
  );
}

