import * as types from './galleryitems.types';

export const startFetchingGalleryItems = (product) => ({
  type: types.GALLERYITEMS_FETCH_STARTED,
  payload: {
    product
  }
});

export const completeFetchingGalleryItems = (entities, order) => ({
  type: types.GALLERYITEMS_FETCH_COMPLETED,
  payload: {
    entities,
    order
  },
});

export const failFetchingGalleryItems = error => ({
  type: types.GALLERYITEMS_FETCH_FAILED,
  payload: { error },
});
