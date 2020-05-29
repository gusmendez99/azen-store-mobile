import * as types from './products.types';

export const startFetchingSingleProduct = (id) => ({
  type: types.SINGLE_PRODUCT_FETCH_STARTED,
  payload: { id },
})

export const completeFetchingSingleProduct = product => ({
  type: types.SINGLE_PRODUCT_FETCH_COMPLETED,
  payload: { product },
})

export const failFetchingSingleProduct = error => ({
  type: types.SINGLE_PRODUCT_FETCH_FAILED,
  payload: { error },
})