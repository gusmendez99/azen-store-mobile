import { combineReducers } from 'redux';
import difference from 'lodash/difference';

import * as types from './payments.types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.PAYMENT_ITEMS_FETCH_COMPLETED: {
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
    case types.PAYMENT_ITEMS_FETCH_COMPLETED: {
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
    case types.PAYMENT_ITEMS_FETCH_STARTED: {
      return true;
    }
    case types.PAYMENT_ITEMS_FETCH_COMPLETED: {
      return false;
    }
    case types.PAYMENT_ITEMS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.PAYMENT_ITEMS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PAYMENT_ITEMS_FETCH_STARTED: {
      return null;
    }
    case types.PAYMENT_ITEMS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


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

const postingPaymentError = (state = null, action) => {
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
  byId,
  order,
  isFetching,
  error,
  payment,
  isPosting,
  postingPaymentError
})

export const getPaymentItem = (state, id) => state.byId[id];
export const getPaymentItems = state => state.order.map(id => getPaymentItem(state, id));
export const getIsFetchingPaymentItems = state => state.isFetching;
export const getFecthingPaymentItemsError = state => state.error;

export const getPayment = (state) => state.payment;
export const getIsPostingPayment = (state) => state.isPosting;
export const getPostingPaymentError = (state) => state.postingPaymentError;