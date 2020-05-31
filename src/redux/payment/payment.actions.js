import * as types from './payments.types';

export const startFetchingPaymentItems = () => ({
  type: types.PAYMENT_ITEMS_FETCH_STARTED,
})

export const completeFetchingPaymentItems = (entities, order) => ({
  type: types.PAYMENT_ITEMS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
})

export const failFetchingPaymentItems = error => ({
  type: types.PAYMENT_ITEMS_FETCH_FAILED,
  payload: { error },
})


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