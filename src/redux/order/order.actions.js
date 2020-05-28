import * as types from './order.types';
 

export const startpostingOrder = (orderData, invoiceData) => ({
  type: types.POST_ORDER_STARTED,
  payload: {
    orderData,
    invoiceData
  },
});
export const completepostingOrder = (order) => ({
  type: types.POST_ORDER_COMPLETED,
  payload: {
    order
  },
});
export const failpostingOrder = (error) => ({
  type: types.POST_ORDER_FAILED,
  payload: {
    error
  },
});