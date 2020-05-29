import * as types from './user.types'

// Get user data
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

// Update user data
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

// Password change
export const startChangingPassword = credentials => ({
  type: types.CHANGE_PASSWORD_STARTED,
  payload: { credentials }
});

// Idk if this functions needs a payload...
export const completeChangingPassword = () => ({
  type: types.CHANGE_PASSWORD_COMPLETED,
});

export const failChangingPassword = error => ({
  type: types.CHANGE_PASSWORD_FAILED,
  payload: { error },
});