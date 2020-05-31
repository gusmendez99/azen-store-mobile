import { combineReducers } from 'redux';
import difference from 'lodash/difference';

import * as types from './invoice.types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.INVOICE_ITEMS_FETCH_COMPLETED: {
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
    case types.INVOICE_ITEMS_FETCH_COMPLETED: {
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
    case types.INVOICE_ITEMS_FETCH_STARTED: {
      return true;
    }
    case types.INVOICE_ITEMS_FETCH_COMPLETED: {
      return false;
    }
    case types.INVOICE_ITEMS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.INVOICE_ITEMS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.INVOICE_ITEMS_FETCH_STARTED: {
      return null;
    }
    case types.INVOICE_ITEMS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


const invoice = (state = {}, action) => {
  switch(action.type){
    case types.POST_INVOICE_STARTED: {
      return {};
    }
    case types.POST_INVOICE_COMPLETED: {
      return action.payload.invoice;
    }
    default: {
      return state;
    }
  }
};

const isPosting = (state = false, action) => {
  switch(action.type) {
    case types.POST_INVOICE_STARTED: {
      return true;
    }
    case types.POST_INVOICE_COMPLETED: {
      return false;
    }
    case types.POST_INVOICE_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const postInvoiceError = (state = null, action) => {
  switch(action.type) {
    case types.POST_INVOICE_FAILED: {
      return action.payload.error;
    }
    case types.POST_INVOICE_STARTED: {
      return null;
    }
    case types.POST_INVOICE_COMPLETED: {
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
  invoice,
  isPosting,
  postInvoiceError
})
export const getInvoiceItem = (state, id) => state.byId[id];
export const getInvoiceItems = state => state.order.map(id => getInvoiceItem(state, id));
export const getIsFetchingInvoiceItems = state => state.isFetching;
export const getFecthingInvoiceItemsError = state => state.error;

export const getInvoice = (state) => state.invoice;
export const getIsPostingInvoice = (state) => state.isPosting;
export const getPostingInvoiceError = (state) => state.postInvoiceError;