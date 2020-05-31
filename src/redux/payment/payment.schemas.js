import { schema } from 'normalizr';


export const paymentItem = new schema.Entity(
  'paymentItems',
);
export const paymentItems = new schema.Array(paymentItem);
