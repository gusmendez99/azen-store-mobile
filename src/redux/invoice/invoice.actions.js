import * as types from './invoice.types';
 
export const startFetchingInvoiceItems = () => ({
  type: types.INVOICE_ITEMS_FETCH_STARTED,
})

export const completeFetchingInvoiceItems = (entities, order) => ({
  type: types.INVOICE_ITEMS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
})

export const failFetchingInvoiceItems = error => ({
  type: types.INVOICE_ITEMS_FETCH_FAILED,
  payload: { error },
})

export const startpostingInvoice = (invoiceData) => ({
  type: types.POST_INVOICE_STARTED,
  payload: invoiceData,
});
export const completepostingInvoice = (invoice) => ({
  type: types.POST_INVOICE_COMPLETED,
  payload: {
    invoice
  },
});
export const failpostingInvoice = (error) => ({
  type: types.POST_INVOICE_FAILED,
  payload: {
    error
  },
});