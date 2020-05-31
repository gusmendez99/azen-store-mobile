import * as types from './order.types';
 
export const startFetchingOrderItems = () => ({
  type: types.ORDER_ITEMS_FETCH_STARTED,
})

export const completeFetchingOrderItems = (entities, order) => ({
  type: types.ORDER_ITEMS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
})

export const failFetchingOrderItems = error => ({
  type: types.ORDER_ITEMS_FETCH_FAILED,
  payload: { error },
})

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