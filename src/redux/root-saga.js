import { fork, all } from 'redux-saga/effects';

import {
  watchRegisterStarted,
  watchLoginStarted,
  watchFacebookAuthenticationStarted,
  watchRefreshTokenStarted,
} from './auth/auth.sagas';
import {
  watchUserFetch,
  watchUserUpdate,
  watchChangePassword
} from './user/user.sagas'
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
} from './products/products.sagas';
import {
  watchCouponFetch
} from './coupon/coupon.sagas';
import {
  watchPostOrder
} from './order/order.sagas';
import {
  watchPostInvoice
} from './invoice/invoice.sagas';
import {
  watchPostPayment
} from './payment/payment.sagas';

function* rootSaga() {
  yield all([
    fork(watchRegisterStarted),
    fork(watchLoginStarted),
    fork(watchFacebookAuthenticationStarted),
    fork(watchRefreshTokenStarted),
    fork(watchCategoriesFetch),
    fork(watchCategoryProductsFetch),
    fork(watchCartFetch),
    fork(watchUserFetch),
    fork(watchUserUpdate),
    fork(watchChangePassword),
    fork(watchCartItemsFetch),
    fork(watchAddCartItem),
    fork(watchRemoveCartItem),
    fork(watchUpdateCartItem),
    fork(watchSingleProductFetch),
    fork(watchCouponFetch),
    fork(watchPostOrder),
    fork(watchPostInvoice),
    fork(watchPostPayment),
  ]);
}


export default rootSaga;
