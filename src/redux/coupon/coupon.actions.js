import * as types from './coupon.types';

export const couponFieldChange = name => ({
  type: types.COUPON_FIELD_CHANGED,
  payload: {
    name
  }
});
export const startFetchingCoupon = () => ({
  type: types.COUPON_FETCH_STARTED,
});

export const completeFetchingCoupon = coupon => ({
  type: types.COUPON_FETCH_COMPLETED,
  payload: {
    coupon
  },
});

export const failFetchingCoupon = error => ({
  type: types.COUPON_FETCH_FAILED,
  payload: { error },
});

export const redeemCoupon = () => ({
  type: types.COUPON_REDEEMED,
});