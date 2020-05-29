import { combineReducers } from 'redux';
import * as types from './payments.types';

const payment = (state = {}, action) => {
  switch(action.type){
    case types.POST_PAYMENT_STARTED: {
      return {};
    }
    case types.POST_PAYMENT_COMPLETED: {
      return action.payload.payment;
    }
    default: {
      return state;
    }
  }
};

const isPosting = (state = false, action) => {
  switch(action.type) {
    case types.POST_PAYMENT_STARTED: {
      return true;
    }
    case types.POST_PAYMENT_COMPLETED: {
      return false;
    }
    case types.POST_PAYMENT_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.POST_PAYMENT_FAILED: {
      return action.payload.error;
    }
    case types.POST_PAYMENT_STARTED: {
      return null;
    }
    case types.POST_PAYMENT_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  payment,
  isPosting,
  error
})

export const getPayment = (state) => state.payment;
export const getIsPostingPayment = (state) => state.isPosting;
export const getPostingPaymentError = (state) => state.error;