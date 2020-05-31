import { combineReducers } from 'redux';
import difference from 'lodash/difference';

import * as types from './order.types';
import * as paymentTypes from '../payment/payments.types'

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.ORDER_ITEMS_FETCH_COMPLETED: {
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
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.ORDER_ITEMS_FETCH_COMPLETED: {
      const newOrder = difference(action.payload.order,state);
      return [...state, ...newOrder];
    }
    default: {
      return state;
    }
  }
};
const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.ORDER_ITEMS_FETCH_STARTED: {
      return true;
    }
    case types.ORDER_ITEMS_FETCH_COMPLETED: {
      return false;
    }
    case types.ORDER_ITEMS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.ORDER_ITEMS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.ORDER_ITEMS_FETCH_STARTED: {
      return null;
    }
    case types.ORDER_ITEMS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const singleOrder = (state = {}, action) => {
  switch(action.type){
    case types.POST_ORDER_STARTED:
    case paymentTypes.POST_PAYMENT_COMPLETED: {
      return {};
    }
    case types.POST_ORDER_COMPLETED: {
      return action.payload.order;
    }
    default: {
      return state;
    }
  }
};

const isPosting = (state = false, action) => {
  switch(action.type) {
    case types.POST_ORDER_STARTED: {
      return true;
    }
    case types.POST_ORDER_COMPLETED: {
      return false;
    }
    case types.POST_ORDER_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const postOrderError = (state = null, action) => {
  switch(action.type) {
    case types.POST_ORDER_FAILED: {
      return action.payload.error;
    }
    case types.POST_ORDER_STARTED: {
      return null;
    }
    case types.POST_ORDER_COMPLETED: {
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
  order,
  singleOrder,
  isPosting,
  postOrderError
})
export const getOrderItem = (state, id) => state.byId[id];
export const getOrderItems = state => state.order.map(id => getOrderItem(state, id));
export const getIsFetchingOrderItems = state => state.isFetching;
export const getFecthingOrderItemsError = state => state.error;

export const getOrder = (state) => state.singleOrder;
export const getIsPostingOrder = (state) => state.isPosting;
export const getPostingOrderError = (state) => state.postOrderError;