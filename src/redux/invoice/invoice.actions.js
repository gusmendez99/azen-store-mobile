import * as types from './invoice.types';


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