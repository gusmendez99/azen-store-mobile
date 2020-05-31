import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  select,
} from 'redux-saga/effects';
import pull from 'lodash/pull';

import * as selectors from '../root-reducer';
import * as actions from './wishlist.actions';
import * as types from './wishlist.types';
import * as schemas from './wishlist.schemas';



const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';


export function* fetchWishlist(action){
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const userId = yield select(selectors.getAuthUserID);
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/wishlists?user=${userId}`,
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
        yield put(actions.completeFetchingWishlist(jsonResult[0]));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingWishlist(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingWishlist('Server Error'));
  }
}
export function* watchWishlistFetch() {
  yield takeEvery(
    types.WISHLIST_FETCH_STARTED,
    fetchWishlist,
  );
}
function* addWishlistItem(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const wishlist = yield select(selectors.getWishlist);
    wishlist["products"].push(action.payload.productId);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/wishlists/${wishlist.id}/`,
        {
          method: 'PUT',
          body: JSON.stringify(wishlist),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(actions.completeAddingWishlistItem(jsonResult));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failAddingWishlistItem(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failAddingWishlistItem('Server error'));
  }
}

export function* watchAddWishlistItem() {
  yield takeEvery(
    types.WISHLIST_ITEM_ADD_STARTED,
    addWishlistItem,
  );
}

function* removeWishlistItem(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const wishlist = yield select(selectors.getWishlist);
    const newProducts = pull(wishlist.products,action.payload.productId)
    const data = {...wishlist, ["products"]: newProducts}
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/wishlists/${wishlist.id}/`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(actions.completeRemovingWishlistItem(jsonResult));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failRemovingWishlistItem(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failRemovingWishlistItem('Server error'));
  }
}

export function* watchRemoveWishlistItem() {
  yield takeEvery(
    types.WISHLIST_ITEM_REMOVE_STARTED,
    removeWishlistItem,
  );
}
