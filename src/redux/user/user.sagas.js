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
