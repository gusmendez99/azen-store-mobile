import * as types from './cart.types';

export const startFetchingCartItems = () => ({
  type: types.CART_ITEMS_FETCH_STARTED,
})

export const completeFetchingCartItems = (entities, order) => ({
  type: types.CART_ITEMS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
})

export const failFetchingCartItems = error => ({
  type: types.CART_ITEMS_FETCH_FAILED,
  payload: { error },
})

export const startFetchingCart = () => ({
  type: types.CART_FETCH_STARTED,
});

export const completeFetchingCart = cart => ({
  type: types.CART_FETCH_COMPLETED,
  payload: {
    cart
  },
})

export const failFetchingCart = error => ({
  type: types.CART_FETCH_FAILED,
  payload: { error },
})




export const startAddingCartItem = cartItem => ({
  type: types.CART_ITEM_ADD_STARTED,
  payload: cartItem,
});
export const completeAddingCartItem = (oldId, cartItem) => ({
  type: types.CART_ITEM_ADD_COMPLETED,
  payload: {
    oldId,
    cartItem,
  },
});
export const failAddingCartItem = (oldId, error) => ({
  type: types.CART_ITEM_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingCartItem = id => ({
  type: types.CART_ITEM_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingCartItem = id => ({
  type: types.CART_ITEM_REMOVE_COMPLETED,
  payload: {
    id,
  },
});
export const failRemovingCartItem = (id, error) => ({
  type: types.CART_ITEM_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});

export const startUpdatingCartItem = cartItem => ({
  type: types.CART_ITEM_UPDATE_STARTED,
  payload: { cartItem },
});
export const completeUpdatingCartItem = (oldId, cartItem) => ({
  type: types.CART_ITEM_UPDATE_COMPLETED,
  payload: {
    oldId,
    cartItem,
  },
});
export const failUpdatingCartItem = (oldId, error) => ({
  type: types.CART_ITEM_UPDATE_FAILED,
  payload: {
    error,
  },
});
