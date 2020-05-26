import { fork, all } from 'redux-saga/effects';

import {
  watchRegisterStarted,
  watchLoginStarted,
  watchFacebookAuthenticationStarted,
  watchRefreshTokenStarted,
} from './auth/auth.sagas';
import {
  watchCategoriesFetch,
  watchCategoryProductsFetch
} from './categories/categories.sagas'
import {
  watchCartFetch,
  watchCartItemsFetch,
  watchAddCartItem,
  watchRemoveCartItem,
  watchUpdateCartItem,
} from './cart/cart.sagas';
import {
  watchSingleProductFetch
} from './products/products.sagas'

function* rootSaga() {
  yield all([
    fork(watchRegisterStarted),
    fork(watchLoginStarted),
    fork(watchFacebookAuthenticationStarted),
    fork(watchRefreshTokenStarted),
    fork(watchCategoriesFetch),
    fork(watchCategoryProductsFetch),
    fork(watchCartFetch),
    fork(watchCartItemsFetch),
    fork(watchAddCartItem),
    fork(watchRemoveCartItem),
    fork(watchUpdateCartItem),
    fork(watchSingleProductFetch)
  ]);
}


export default rootSaga;
