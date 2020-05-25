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
  watchCartFetch
} from './cart/cart.sagas';


function* rootSaga() {
  yield all([
    fork(watchRegisterStarted),
    fork(watchLoginStarted),
    fork(watchFacebookAuthenticationStarted),
    fork(watchRefreshTokenStarted),
    fork(watchCategoriesFetch),
    fork(watchCategoryProductsFetch),
    fork(watchCartFetch),
  ]);
}


export default rootSaga;
