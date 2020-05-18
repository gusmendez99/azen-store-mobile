import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
} from './auth/auth.sagas';


function* rootSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
  ]);
}


export default rootSaga;
