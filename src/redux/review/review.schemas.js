import { schema } from 'normalizr';


export const review = new schema.Entity(
  'reviews',
);
export const reviews = new schema.Array(review);
