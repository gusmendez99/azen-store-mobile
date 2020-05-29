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

export function* fetchCart(action){
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const userId = yield select(selectors.getAuthUserID);
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/carts?user=${userId}`,
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
        yield put(actions.completeFetchingCart(jsonResult[0]));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingCart(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingCart('Server Error'));
  }
}
export function* watchCartFetch() {
  yield takeEvery(
    types.CART_FETCH_STARTED,
    fetchCart,
  );
}

function* fetchCartItems(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const userId = yield select(selectors.getAuthUserID);
      const token = yield select(selectors.getAuthToken);
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
          actions.completeFetchingCartItems(
            cartItems,
            result,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingCartItems(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingCartItems(error.message));
  }
}

export function* watchCartItemsFetch() {
  yield takeEvery(
    types.CART_ITEMS_FETCH_STARTED,
    fetchCartItems,
  );
}

function* addCartItem(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/cart-items/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const jsonResult = yield response.json();
        yield put(
          actions.completeAddingCartItem(
            action.payload.id,
            jsonResult,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failAddingCartItem(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failAddingCartItem('Server error'));
  }
}

export function* watchAddCartItem() {
  yield takeEvery(
    types.CART_ITEM_ADD_STARTED,
    addCartItem,
  );
}

function* removeCartItem(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/cart-items/${action.payload.id}/`,
        {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      if (response.status === 204) {
        yield put(actions.completeRemovingCartItem(action.payload.id));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failRemovingCartItem(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failRemovingCartItem('Server error'));
    console.log("ERROR", error)
  }
}

export function* watchRemoveCartItem() {
  yield takeEvery(
    types.CART_ITEM_REMOVE_STARTED,
    removeCartItem,
  );
}

function* updateCartItem(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/cart-items/${action.payload.cartItem.id}/`,
        {
          method: 'PUT',
          body: JSON.stringify(action.payload.cartItem),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(
          actions.completeUpdatingCartItem(
            action.payload.cartItem.id,
            jsonResult,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failUpdatingCartItem(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failUpdatingCartItem('Server error'));
  }
}

export function* watchUpdateCartItem() {
  yield takeEvery(
    types.CART_ITEM_UPDATE_STARTED,
    updateCartItem,
  );
}