import { schema } from 'normalizr';


export const cartItem = new schema.Entity(
  'cartItems',
);
export const cartItems = new schema.Array(cartItem);
