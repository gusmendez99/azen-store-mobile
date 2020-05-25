import * as types from './cart.types';

export const startFetchingCart = () => ({
  type: types.CART_FETCH_STARTED,
})

export const completeFetchingCart = (entities, order) => ({
  type: types.CART_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
})

export const failFetchingCart = error => ({
  type: types.CART_FETCH_FAILED,
  payload: { error },
})