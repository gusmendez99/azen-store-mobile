import * as types from './user.types'

export const startFetchingUser = () => ({
  type: types.USER_FETCH_STARTED
});

export const completeFetchingUser = user => ({
  type: types.USER_FETCH_COMPLETED,
  payload: { user },
});

export const failFetchingUser = error => ({
  type: types.USER_FETCH_FAILED,
  payload: { error },
});


export const startUpdatingUser = updateUser => ({
  type: types.USER_UPDATE_STARTED,
  payload: { updateUser }
});

export const completeUpdatingUser = user => ({
  type: types.USER_UPDATE_COMPLETED,
  payload: { user },
});

export const failUpdatingUser = error => ({
  type: types.USER_UPDATE_FAILED,
  payload: { error },
});