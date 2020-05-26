import {
	call,
	takeEvery,
	put,
	delay,
	select,
} from 'redux-saga/effects';


import * as selectors from '../root-reducer';
import * as actions from './products.actions';
import * as types from './products.types';

const API_BASE_URL = 'https://azenstore.herokuapp.com/api/v1';

function* fetchSingleProduct(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/products/${action.payload.id}/`,
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
        yield put(actions.completeFetchingSingleProduct(jsonResult));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingSingleProduct(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingSingleProduct('Server error'));
    console.log("ERROR", error)
  }
}

export function* watchSingleProductFetch() {
  yield takeEvery(
    types.SINGLE_PRODUCT_FETCH_STARTED,
    fetchSingleProduct,
  );
}