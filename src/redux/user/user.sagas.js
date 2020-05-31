import {
	call,
	takeEvery,
	put,
	delay,
	select,
} from 'redux-saga/effects';

import * as selectors from '../root-reducer';
import * as actions from './user.actions';
import * as types from './user.types';

import * as RootNavigation from '../../RootNavigation.js';

const API_BASE_URL = 'https://azenstore.herokuapp.com/api/v1';

function* fetchUser(action) {
	const authUserID = yield select(selectors.getAuthUserID);

	try {
		const isAuth = yield select(selectors.isAuthenticated);

		if (isAuth) {
			const token = yield select(selectors.getAuthToken);
			const response = yield call(
				fetch,
				`${API_BASE_URL}/users/${authUserID}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `JWT ${token}`,
					},
				}
			);

			if (response.status === 200) {
				const jsonResult = yield response.json();
				console.log(jsonResult)
				yield put(
					actions.completeFetchingUser(jsonResult),
				);
			} else {
				const { non_field_errors } = yield response.json();
				yield put(actions.failFetchingUser(non_field_errors[0]));
			}
		}
	} catch (error) {
		yield put(actions.failFetchingUser('Server error'));
	}
}

function* updateUser(action) {
	const authUserID = yield select(selectors.getAuthUserID);

	try {
		const isAuth = yield select(selectors.isAuthenticated);

		if (isAuth) {
			const token = yield select(selectors.getAuthToken);
			const updateUser = action.payload.updateUser;

			const response = yield call(
				fetch,
				`${API_BASE_URL}/auth/user/`,
				{
					method: 'PUT',
					body: JSON.stringify(updateUser),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `JWT ${token}`,
					},
				}
			);

			if (response.status === 200) {
				const jsonResult = yield response.json();
				console.log(jsonResult)
				yield put(
					actions.completeUpdatingUser(jsonResult),
				);
			} else {
				const { non_field_errors } = yield response.json();
				yield put(actions.failUpdatingUser(non_field_errors[0]));
			}
		}
	} catch (error) {
		yield put(actions.failUpdatingUser('Server error'));
	}
}

function* changePassword(action) {
	try {
		const isAuth = yield select(selectors.isAuthenticated);

		if (isAuth) {
			const token = yield select(selectors.getAuthToken);
			const { newPassword1, newPassword2, oldPassword } = action.payload.credentials;
			// Applying Django format
			const credentials = {
				new_password1: newPassword1,
				new_password2: newPassword2,
				old_password: oldPassword
			}

			console.log(credentials)

			const response = yield call(
				fetch,
				`${API_BASE_URL}/auth/password/change/`,
				{
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `JWT ${token}`,
					},
				}
			);

			console.log("CP Status: ", response.status)

			if(response.status === 200) {
				const jsonResult = yield response.json();
				console.log(jsonResult)
				yield put(
					actions.completeChangingPassword(),
					RootNavigation.navigate('Profile')
				);
			} else {
				const { non_field_errors } = yield response.json();
				yield put(actions.failChangingPassword(non_field_errors[0]));
			}
		}
	} catch (error) {
		yield put(actions.failChangingPassword('Server error'));
	}
}



export function* watchUserFetch() {
	yield takeEvery(
		types.USER_FETCH_STARTED,
		fetchUser,
	);
};

export function* watchUserUpdate() {
	yield takeEvery(
		types.USER_UPDATE_STARTED,
		updateUser,
	);
};

export function* watchChangePassword() {
	yield takeEvery(
		types.CHANGE_PASSWORD_STARTED,
		changePassword,
	);
};
