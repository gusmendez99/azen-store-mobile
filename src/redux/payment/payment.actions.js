import * as types from './payments.types';


export const startpostingPayment = (paymentData) => ({
  type: types.POST_PAYMENT_STARTED,
  payload: paymentData,
});
export const completepostingPayment = (payment) => ({
  type: types.POST_PAYMENT_COMPLETED,
  payload: {
    payment
  },
});
export const failpostingPayment = (error) => ({
  type: types.POST_PAYMENT_FAILED,
  payload: {
    error
  },
});