import * as types from './user.types'
import { combineReducers } from 'redux';

const user = (state = {}, action) => {
  switch (action.type) {
    case types.USER_FETCH_COMPLETED:
    case types.USER_UPDATE_COMPLETED: {
      return action.payload.user
    }
    case types.AUTHENTICATION_IDENTITY_CLEARED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.USER_FETCH_STARTED: {
      return true;
    }
    case types.USER_FETCH_COMPLETED:  {
      return false;
    }
    case types.USER_FETCH_FAILED:  {
      return false;
    }
    default: {
      return state;
    }
  }
};

const isUpdating = (state = false, action) => {
  switch (action.type) {
    case types.USER_UPDATE_STARTED: {
      return true;
    }
    case types.USER_UPDATE_COMPLETED:  {
      return false;
    }
    case types.USER_UPDATE_FAILED:  {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.USER_FETCH_FAILED:
    case types.USER_UPDATE_FAILED:  {
      return action.payload.error;
    }
    case types.USER_FETCH_STARTED:
    case types.USER_UPDATE_STARTED: {
      return null;
    }
    case types.USER_FETCH_COMPLETED: 
    case types.USER_UPDATE_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  user,
  isFetching,
  isUpdating,
  error
});

export const getUser = state => state.user;
export const getIsFetchingUser = state => state.isFetching;
export const getIsUpdatingUser = state => state.isUpdating;
export const getFetchingUserError = state => state.error;