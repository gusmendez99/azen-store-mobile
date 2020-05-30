import { combineReducers } from 'redux';
import * as types from './order.types';
import * as paymentTypes from '../payment/payments.types'

const order = (state = {}, action) => {
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

const error = (state = null, action) => {
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
  order,
  isPosting,
  error
})

export const getOrder = (state) => state.order;
export const getIsPostingOrder = (state) => state.isPosting;
export const getPostingOrderError = (state) => state.error;