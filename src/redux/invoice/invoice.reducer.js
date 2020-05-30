import { combineReducers } from 'redux';
import * as types from './invoice.types';
import * as paymentTypes from '../payment/payments.types'

const invoice = (state = {}, action) => {
  switch(action.type){
    case types.POST_INVOICE_STARTED:
    case paymentTypes.POST_PAYMENT_COMPLETED: {
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

const error = (state = null, action) => {
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
  invoice,
  isPosting,
  error
})

export const getInvoice = (state) => state.invoice;
export const getIsPostingInvoice = (state) => state.isPosting;
export const getPostingInvoiceError = (state) => state.error;