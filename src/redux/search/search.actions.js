import * as types from './search.types';

export const startSearchingProducts = (query) => ({
  type: types.SEARCH_PRODUCT_FETCH_STARTED,
  payload: { query },
})

export const completeSearchingProducts = (entities, order) => ({
  type: types.SEARCH_PRODUCT_FETCH_COMPLETED,
  payload: { entities, order },
})

export const failSearchingProducts = error => ({
  type: types.SEARCH_PRODUCT_FETCH_FAILED,
  payload: { error },
})