import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from './cart.types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.CART_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });

      return newState;
    }
    // case types.PET_OWNER_ADD_STARTED: {
    //   const newState = { ...state };
    //   newState[action.payload.id] = {
    //     ...action.payload,
    //     isConfirmed: false,
    //   };
    //   return newState;
    // }
    // case types.PET_OWNER_ADD_COMPLETED: {
    //   const { oldId, petOwner } = action.payload;
    //   const newState = omit(state, oldId);
    //   newState[petOwner.id] = {
    //     ...petOwner,
    //     isConfirmed: true,
    //   };
    //   return newState;
    // }
    // case types.PET_OWNER_REMOVE_STARTED: {
    //   return omit(state, action.payload.id);
    // }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.CART_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    // case types.PET_OWNER_ADD_STARTED: {
    //   return [...state, action.payload.id];
    // }
    // case types.PET_OWNER_ADD_COMPLETED: {
    //   const { oldId, petOwner } = action.payload;
    //   return state.map(id => id === oldId ? petOwner.id : id);
    // }
    // case types.PET_OWNER_REMOVE_STARTED: {
    //   return state.filter(id => id !== action.payload.id);
    // }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
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

export default combineReducers({
  byId,
  order,
  isFetching,
  error,
});

export const getCartItem = (state, id) => state.byId[id];
export const getCartItems = state => state.order.map(id => getCartItem(state, id));
export const isFetchingCartItens = state => state.isFetching;
export const getFecthingCartItemsError = state => state.error;
