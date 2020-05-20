import { fork, all } from 'redux-saga/effects';

import {
  watchRegisterStarted,
  watchLoginStarted,
  watchRefreshTokenStarted,
} from './auth/auth.sagas';


function* rootSaga() {
  yield all([
    fork(watchRegisterStarted),
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
  ]);
}


export default rootSaga;
