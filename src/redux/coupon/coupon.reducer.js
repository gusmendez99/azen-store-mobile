import * as types from './coupon.types';
import { combineReducers } from 'redux';
import isEmpty from 'lodash/isEmpty';

export const couponField = (state = '', action) => {
  switch(action.type){
    case types.COUPON_FIELD_CHANGED: {
      return action.payload.name
    }
    default:
      return state;
  }
}

export const coupon = (state = {}, action) => {
  switch(action.type){
    case types.COUPON_FETCH_COMPLETED: {
      return action.payload.coupon
    }
    case types.COUPON_REDEEMED: {
      return {}
    }
    case types.COUPON_FETCH_FAILED: {
      return {}
    }
    default:
      return state;
  }
}


const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.COUPON_FETCH_STARTED: {
      return true;
    }
    case types.COUPON_FETCH_COMPLETED: {
      return false;
    }
    case types.COUPON_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.COUPON_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.COUPON_FETCH_STARTED: {
      return null;
    }
    case types.COUPON_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  couponField,
  coupon,
  isFetching,
  error
})

export const getCoupon = state => isEmpty(state.coupon) ? null : state.coupon;
export const getIsFetchingCoupon = state => state.isFetching;
export const getFetchingCouponError = state => state.error;
export const getCouponField = state => state.couponField;