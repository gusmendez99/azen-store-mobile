import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
  } from 'redux-saga/effects';
  
  import * as selectors from '../root-reducer';
  import * as actions from './auth.actions';
  import * as types from './auth.types';
  
  const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';
  
  function* register(action){
    try {
      const response = yield call(
        fetch,
        `${API_BASE_URL}/auth/registration/`,
          {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers: {
              'Content-Type': 'application/json',
            },
          },
      );
      if (response.status === 201){
        const { token } = yield response.json();
        yield put(actions.completeRegister(token));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failRegister(non_field_errors[0]))
      }
    } catch (error){
      yield put(actions.failRegister(error))
    }    
  }

  export function* watchRegisterStarted(){
    yield takeEvery(
      types.REGISTER_STARTED,
      register,
    );
  }

  function* login(action) {
    try {
      const response = yield call(
        fetch,
        `${API_BASE_URL}/auth/login/`,
          {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers:{
              'Content-Type': 'application/json',
            },
          },
      );
 
      if (response.status === 200) {
        const { token } = yield response.json();
        yield put(actions.completeLogin(token));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failLogin(non_field_errors[0]));
      }
    } catch (error) {
      yield put(actions.failLogin(error));
    }
  }
  
  export function* watchLoginStarted() {
    yield takeEvery(
      types.AUTHENTICATION_STARTED,
      login,
    );
  }

  function* authenticateWithFacebook(action){
    try {
      console.log("In Sagas", action.payload);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/auth/facebook/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.status);
      if (response.status === 200 || response.status === 201){
        const { token } = yield response.json();
        yield put(actions.completeFacebookAuth(token))
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFacebookAuth(non_field_errors[0]));
      }
    } catch (error){
      yield put(actions.failFacebookAuth(error))
    }
  }

  export function* watchFacebookAuthenticationStarted() {
    yield takeEvery(
      types.FACEBOOK_AUTHENTICATION_STARTED,
      authenticateWithFacebook,
    );
  }
  

  function* refreshToken(action) {
    const expiration = yield select(selectors.getAuthExpiration);
    const now =  parseInt(new Date().getTime() / 1000);
    if (expiration - now < 3600) {
      try {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/token-refresh/`,
          {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers:{
              'Content-Type': 'application/json',
            },
          },
        );
  
        if (response.status === 200) {
          const jResponse = yield response.json();
          yield put(actions.completeTokenRefresh(jResponse.token));
        } else {
          // TODO: poner un redirect al home (login)
          const { non_field_errors } = yield response.json();
          yield put(actions.failTokenRefresh(non_field_errors[0]));
        }
      } catch (error) {
        // TODO: poner un redirect al home (login)
        yield put(actions.failTokenRefresh('Server connection error'));
      }
    }
  }
  
  export function* watchRefreshTokenStarted() {
    yield takeEvery(
      types.TOKEN_REFRESH_STARTED,
      refreshToken,
    );
  }
  