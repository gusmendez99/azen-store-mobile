import omit from 'lodash/omit';
import difference from 'lodash/difference';
import sum from 'lodash/sum';
import { combineReducers } from 'redux';
import * as types from './cart.types';
import * as paymentTypes from '../payment/payments.types'

const cartDetails = (state = {}, action) => {
  switch(action.type){
    case types.CART_FETCH_COMPLETED: {
      return {...state, ...action.payload.cart}
    }
    case paymentTypes.POST_PAYMENT_COMPLETED: {
      return {};
    }
    default: {
      return state;
    }
  }
};
const byId = (state = {}, action) => {
  switch(action.type) {
    case types.CART_ITEMS_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          // isConfirmed: true,
        };
      });

      return newState;
    }
    case types.CART_ITEM_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload
        // isConfirmed: false,
      };
      return newState;
    }
    case types.CART_ITEM_ADD_COMPLETED: {
      const { oldId, cartItem } = action.payload;
      const newState = omit(state, oldId);
      newState[cartItem.id] = {
        ...cartItem,
        // isConfirmed: true,
      };
      return newState;
    }
    case types.CART_ITEM_REMOVE_COMPLETED: {
      return omit(state, action.payload.id);
    }
    case types.CART_ITEM_UPDATE_COMPLETED: {
      const { oldId, cartItem } = action.payload;
      const newState = omit(state, oldId);
      newState[cartItem.id] = {
        ...cartItem,
        // isConfirmed: true,
      };
      return newState;
    }
    case paymentTypes.POST_PAYMENT_COMPLETED: {
      return {};
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.CART_ITEMS_FETCH_COMPLETED: {
      const newOrder = difference(action.payload.order,state);
      return [...state, ...newOrder];
    }
    case types.CART_ITEM_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.CART_ITEM_ADD_COMPLETED: {
      const { oldId, cartItem } = action.payload;
      return state.map(id => id === oldId ? cartItem.id : id);
    }
    case types.CART_ITEM_REMOVE_COMPLETED: {
      return state.filter(id => id !== action.payload.id);
    }
    case types.CART_ITEM_UPDATE_COMPLETED: {
      const { oldId, cartItem } = action.payload;
      return state.map(id => id === oldId ? cartItem.id : id);
    }
    case paymentTypes.POST_PAYMENT_COMPLETED: {
      return [];
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.CART_ITEMS_FETCH_STARTED: {
      return true;
    }
    case types.CART_ITEMS_FETCH_COMPLETED: {
      return false;
    }
    case types.CART_ITEMS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const isFetchingCart = (state = false, action) => {
  switch(action.type) {
    case types.CART_FETCH_STARTED: {
      return true;
    }
    case types.CART_FETCH_COMPLETED: {
      return false;
    }
    case types.CART_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.CART_ITEMS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.CART_ITEMS_FETCH_STARTED: {
      return null;
    }
    case types.CART_ITEMS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const fetchCartError = (state = null, action) => {
  switch(action.type) {
    case types.CART_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.CART_FETCH_STARTED: {
      return null;
    }
    case types.CART_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const addCartItemError = (state=null, action) => {
  switch(action.type){
    case types.CART_ITEM_ADD_FAILED: {
      return action.payload.error;
    }
    case types.CART_ITEM_ADD_COMPLETED: {
      return null;
    }
    case types.CART_ITEM_ADD_STARTED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const removeCartItemError = (state=null, action) => {
  switch(action.type){
    case types.CART_ITEM_REMOVE_FAILED: {
      return action.payload.error;
    }
    case types.CART_ITEM_REMOVE_COMPLETED: {
      return null;
    }
    case types.CART_ITEM_REMOVE_STARTED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const updateCartItemError = (state=null, action) => {
  switch(action.type){
    case types.CART_ITEM_UPDATE_FAILED: {
      return action.payload.error;
    }
    case types.CART_ITEM_UPDATE_COMPLETED: {
      return null;
    }
    case types.CART_ITEM_UPDATE_STARTED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  cartDetails,
  byId,
  order,
  isFetching,
  isFetchingCart,
  error,
  fetchCartError,
  addCartItemError,
  removeCartItemError,
  updateCartItemError
});

export const getCartItem = (state, id) => state.byId[id];
export const getCartItems = state => state.order.map(id => getCartItem(state, id));
export const isFetchingCartItens = state => state.isFetching;
export const getFecthingCartItemsError = state => state.error;
export const getCartItemByProductId = (state, productId) => {
  const match = state.order.filter(id => getCartItem(state,id).product === productId );
  return getCartItem(state, match[0]);
}
export const getAddCartItemError = state => state.addCartItemError;
export const getRemoveCartItemError = state => state.removeCartItemError;
export const getUpdateCartItemError = state => state.updateCartItemError;
export const getCart = state => state.cartDetails;
export const getIsFetchingCart = state => state.isFetchingCart;
export const getFetchCartError = state => state.fetchCartError; 
export const getCartSubtotal = state => sum(getCartItems(state).map(cartItem =>  cartItem.quantity * cartItem.item_price))