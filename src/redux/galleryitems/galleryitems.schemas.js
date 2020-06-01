import { schema } from 'normalizr';


export const galleryItem = new schema.Entity(
  'galleryItems',
);
export const galleryItems = new schema.Array(galleryItem);
