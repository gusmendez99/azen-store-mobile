import * as types from './products.types';
import difference from 'lodash/difference';
import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch(action.type){
    case types.SINGLE_PRODUCT_FETCH_COMPLETED: {
      return {...state, [action.payload.product.id]: action.payload.product}
    }
    default:{
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type){
    case types.SINGLE_PRODUCT_FETCH_COMPLETED: {
      const newOrder = difference([action.payload.product.id],state);
      return [...state, ...newOrder];
    }
    default: {
      return state
    }
  }
};

export default combineReducers({
  byId,
  order,
})

export const getProduct = (state, id) => state.byId[id];
export const getProducts = state => state.order.map(id => getProduct(state, id));
