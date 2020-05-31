import { schema } from 'normalizr';

export const product = new schema.Entity(
  'products',
);
export const products = new schema.Array(product);
