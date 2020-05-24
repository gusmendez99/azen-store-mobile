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

// Filter products by category
export const startFetchingCategoryProducts = idCategory => ({
  type: types.CATEGORY_PRODUCTS_FETCH_STARTED,
  payload: {
    idCategory: idCategory
  }
});

export const completeFetchingCategoryProducts = products => ({
  type: types.CATEGORY_PRODUCTS_FETCH_COMPLETED,
  payload: {
    products: products
  },
});

export const failFetchingCategoryProducts = error => ({
  type: types.CATEGORY_PRODUCTS_FETCH_FAILED,
  payload: { error },
});