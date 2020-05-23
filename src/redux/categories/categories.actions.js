import * as types from './categories.types'

export const startFetchingCategories = () => ({
  type: types.CATEGORY_FETCH_STARTED
});

export const completeFetchingCategories = categories => ({
  type: types.CATEGORY_FETCH_COMPLETED,
  payload: {
      categories: categories
    },
});

export const failFetchingCategories = error => ({
  type: types.CATEGORY_FETCH_FAILED,
  payload: { error },
});