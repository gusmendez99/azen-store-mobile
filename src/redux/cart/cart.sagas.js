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
import * as actions from './cart.actions';
import * as types from './cart.types';
import * as schemas from './cart.schemas';


const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';


export function* fetchCartItems(action) {
  try {
    console.log('Si llegué mano')
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const userId = yield select(selectors.getAuthUserID);
      const token = yield select(selectors.getAuthToken);
      console.log(userId, token);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/${userId}/cart-items/`,
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
          entities: { cartItems },
          result,
        } = normalize(jsonResult, schemas.cartItems);

        yield put(
          actions.completeFetchingCart(
            cartItems,
            result,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingCart(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingCart(error.message));
  }
}

export function* watchCartFetch() {
  yield takeEvery(
    types.CART_FETCH_STARTED,
    fetchCartItems,
  );
}