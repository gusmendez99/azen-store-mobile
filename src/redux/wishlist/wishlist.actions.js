import * as types from './wishlist.types';

export const startFetchingWishlist = () => ({
  type: types.WISHLIST_FETCH_STARTED,
});
export const completeFetchingWishlist = wishlist => ({
  type: types.WISHLIST_FETCH_COMPLETED,
  payload: {
    wishlist
  },
})
export const failFetchingWishlist = error => ({
  type: types.WISHLIST_FETCH_FAILED,
  payload: { error },
})

export const startAddingWishlistItem = productId => ({
  type: types.WISHLIST_ITEM_ADD_STARTED,
  payload: {productId},
});
export const completeAddingWishlistItem = (wishlist) => ({
  type: types.WISHLIST_ITEM_ADD_COMPLETED,
  payload: {
    wishlist,
  },
});
export const failAddingWishlistItem = (oldId, error) => ({
  type: types.WISHLIST_ITEM_ADD_FAILED,
  payload: {
    error,
  },
});

export const startRemovingWishlistItem = productId => ({
  type: types.WISHLIST_ITEM_REMOVE_STARTED,
  payload: {
    productId
  },
});
export const completeRemovingWishlistItem = wishlist => ({
  type: types.WISHLIST_ITEM_REMOVE_COMPLETED,
  payload: {
    wishlist
  },
});
export const failRemovingWishlistItem = (id, error) => ({
  type: types.WISHLIST_ITEM_REMOVE_FAILED,
  payload: {
    error,
  },
});