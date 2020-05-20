import jwtDecode from 'jwt-decode';
import { combineReducers } from 'redux';

import * as types from './auth.types';


const token = (state = null, action) => {
  switch(action.type) {
    case types.REGISTER_STARTED: {
      return null;
    }
    case types.REGISTER_COMPLETED: {
      return action.payload.token
    }
    case types.AUTHENTICATION_STARTED: {
      return null;
    }
    case types.AUTHENTICATION_COMPLETED: {
      return action.payload.token;
    }
    case types.TOKEN_REFRESH_COMPLETED: {
      return action.payload.newToken;
    }
    case types.AUTHENTICATION_FAILED: {
      return null;
    }
    case types.REGISTER_STARTED: {
      return null;
    }
    case types.AUTHENTICATION_IDENTITY_CLEARED: {
      return null;
    }
  }

  return state;
};

const decoded = (state = null, action) => {
  switch(action.type) {
    case types.REGISTER_STARTED: {
      return null;
    }
    case types.AUTHENTICATION_STARTED: {
      return null;
    }
    case types.REGISTER_COMPLETED: {
      return jwtDecode(action.payload.token);
    }
    case types.AUTHENTICATION_COMPLETED: {
      return jwtDecode(action.payload.token);
    }
    case types.TOKEN_REFRESH_COMPLETED: {
      return jwtDecode(action.payload.newToken);
    }
    case types.REGISTER_FAILED: {
      return null;
    }
    case types.AUTHENTICATION_FAILED: {
      return null;
    }
    case types.AUTHENTICATION_IDENTITY_CLEARED: {
      return null;
    }
  }

  return state;
};

const isRegistering = (state = false, action) => {
  switch(action.type) {
    case types.REGISTER_STARTED: {
      return true;
    }
    case types.REGISTER_COMPLETED: {
      return false;
    }
    case types.REGISTER_FAILED: {
      return false;
    }
  }

  return state;
};

const registeringError = (state = null, action) => {
  switch(action.type) {
    case types.REGISTER_STARTED: {
      return null;
    }
    case types.REGISTER_COMPLETED: {
      return null;
    }
    case types.REGISTER_FAILED: {
      return action.payload.error;
    }
  }
  return state;
};

const isAuthenticating = (state = false, action) => {
  switch(action.type) {
    case types.AUTHENTICATION_STARTED: {
      return true;
    }
    case types.AUTHENTICATION_COMPLETED: {
      return false;
    }
    case types.AUTHENTICATION_FAILED: {
      return false;
    }
  }

  return state;
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.AUTHENTICATION_STARTED: {
      return null;
    }
    case types.AUTHENTICATION_COMPLETED: {
      return null;
    }
    case types.AUTHENTICATION_FAILED: {
      return action.payload.error;
    }
  }

  return state;
};

const isRefreshing = (state = false, action) => {
  switch(action.type) {
    case types.TOKEN_REFRESH_STARTED: {
      return true;
    }
    case types.TOKEN_REFRESH_COMPLETED: {
      return false;
    }
    case types.TOKEN_REFRESH_FAILED: {
      return false;
    }
  }

  return state;
};

const refreshingError = (state = null, action) => {
  switch(action.type) {
    case types.TOKEN_REFRESH_STARTED: {
      return null;
    }
    case types.TOKEN_REFRESH_COMPLETED: {
      return null;
    }
    case types.TOKEN_REFRESH_FAILED: {
      return action.payload.error;
    }
  }

  return state;
};

const auth = combineReducers({
  token,
  decoded,
  isRegistering,
  isAuthenticating,
  isRefreshing,
  registeringError,
  error,
  refreshingError,
});


export default auth;


export const getAuthToken = state => state.token;
export const getIsRegistering = state => state.isRegistering;
export const getRegisteringError = state => state.registeringError;
export const getIsAuthenticating = state => state.isAuthenticating;
export const getAuthenticatingError = state => state.error;
export const getAuthUserID = state => state.decoded ? state.decoded.user_id : null;
export const getAuthExpiration = state => state.decoded ? state.decoded.exp : null;
export const getAuthUsername = state => state.decoded ? state.decoded.username : null;
export const getIsRefreshingToken = state => state.isRefreshing;
export const getRefreshingError = state => state.refreshingError;
