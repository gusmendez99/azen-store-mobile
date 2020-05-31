import { schema } from 'normalizr';


export const orderItem = new schema.Entity(
  'orderItems',
);
export const orderItems = new schema.Array(orderItem);
