import {
	call,
	takeEvery,
	put,
	delay,
	select,
} from 'redux-saga/effects';

import * as selectors from '../root-reducer';
import * as actions from './categories.actions';
import * as types from './categories.types';

const API_BASE_URL = 'https://azenstore.herokuapp.com/api/v1';

function* fetchCategories(action) {
	try {
		const isAuth = yield select(selectors.isAuthenticated);

		if (isAuth) {
			const token = yield select(selectors.getAuthToken);
			const response = yield call(
				fetch,
				`${API_BASE_URL}/categories/`,
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
				yield put(
					actions.completeFetchingCategories(jsonResult),
				);
			} else {
				const { non_field_errors } = yield response.json();
				yield put(actions.failFetchingCategories(non_field_errors[0]));
			}
		}
	} catch (error) {
		yield put(actions.failFetchingCategories('Server error'));
	}
}

function* fetchCategoryProducts(action) {
	try {
		const isAuth = yield select(selectors.isAuthenticated);

		if (isAuth) {
			const token = yield select(selectors.getAuthToken);
			const { idCategory } = action.payload;

			const response = yield call(
				fetch,
				`${API_BASE_URL}/categories/${idCategory}/products`,
				{
					method: 'GET',
					headers:{
						'Content-Type': 'application/json',
						'Authorization': `JWT ${token}`,
					},
				}
			);

			if (response.status === 200) {
				const result = yield response.json();
				yield put(
					actions.completeFetchingCategoryProducts(result),
				);
			} else {
				const { non_field_errors } = yield response.json();
				yield put(actions.failFetchingCategoryProducts(non_field_errors[0]));
			}
		}
	} catch (error) {
		yield put(actions.failFetchingCategoryProducts('Server error'));
	}
}

export function* watchCategoriesFetch() {
	yield takeEvery(
		types.CATEGORY_FETCH_STARTED,
		fetchCategories,
	);
};

export function* watchCategoryProductsFetch() {
	yield takeEvery(
		types.CATEGORY_PRODUCTS_FETCH_STARTED,
		fetchCategoryProducts,
	);
};
