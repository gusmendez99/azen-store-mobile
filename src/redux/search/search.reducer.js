import * as types from './search.types'
import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch(action.type){
    case types.SEARCH_PRODUCT_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = {};
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
        };
      });

      return newState;
    }
    default:{
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type){
    case types.SEARCH_PRODUCT_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    default: {
      return state
    }
  }
};

const isSearching = (state = false, action) => {
  switch (action.type) {
    case types.SEARCH_PRODUCT_FETCH_STARTED: {
      return true;
    }
    case types.SEARCH_PRODUCT_FETCH_COMPLETED:  {
      return false;
    }
    case types.SEARCH_PRODUCT_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.SEARCH_PRODUCT_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.SEARCH_PRODUCT_FETCH_STARTED:
    case types.SEARCH_PRODUCT_FETCH_COMPLETED:  {
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
  isSearching,
  error
});

export const getFilteredProduct = (state, id) => state.byId[id];
export const getFilteredProducts = state => state.order.map(id => getFilteredProduct(state, id));
export const getIsSearching = state => state.isSearching;
export const getSearchingError = state => state.error;