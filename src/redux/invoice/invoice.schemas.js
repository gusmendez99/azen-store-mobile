import { schema } from 'normalizr';


export const invoiceItem = new schema.Entity(
  'invoiceItems',
);
export const invoiceItems = new schema.Array(invoiceItem);
