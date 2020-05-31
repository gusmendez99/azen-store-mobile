import omit from 'lodash/omit';
import difference from 'lodash/difference';
import { combineReducers } from 'redux';
import * as types from './wishlist.types';

const wishlist = (state = {}, action) => {
  switch(action.type){
    case types.WISHLIST_FETCH_COMPLETED: {
      return {...state, ...action.payload.wishlist}
    }
    case types.WISHLIST_ITEM_ADD_COMPLETED: {
      return {...state, ["products"]: action.payload.wishlist.products}
    }
    case types.WISHLIST_ITEM_REMOVE_COMPLETED: {
      return {...state, ["products"] : action.payload.wishlist.products }
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.WISHLIST_FETCH_STARTED: {
      return true;
    }
    case types.WISHLIST_FETCH_COMPLETED: {
      return false;
    }
    case types.WISHLIST_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};


const error = (state = null, action) => {
  switch(action.type) {
    case types.WISHLIST_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.WISHLIST_FETCH_STARTED: {
      return null;
    }
    case types.WISHLIST_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const addWishlistItemError = (state=null, action) => {
  switch(action.type){
    case types.WISHLIST_ITEM_ADD_FAILED: {
      return action.payload.error;
    }
    case types.WISHLIST_ITEM_ADD_COMPLETED: {
      return null;
    }
    case types.WISHLIST_ITEM_ADD_STARTED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const removeWishlistItemError = (state=null, action) => {
  switch(action.type){
    case types.WISHLIST_ITEM_REMOVE_FAILED: {
      return action.payload.error;
    }
    case types.WISHLIST_ITEM_REMOVE_COMPLETED: {
      return null;
    }
    case types.WISHLIST_ITEM_REMOVE_STARTED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  wishlist,
  isFetching,
  error,
  addWishlistItemError,
  removeWishlistItemError,
})

export const getWishlist = (state) => state.wishlist;
export const getIsFetchingWishlist = (state) => state.isFetching;
export const getFetchingWishlistError = state => state.error;
export const getAddWishlistItemError = state => state.addWishlistItemError;
export const getRemoveWishlistItemError = state => state.removeWishlistItemError;