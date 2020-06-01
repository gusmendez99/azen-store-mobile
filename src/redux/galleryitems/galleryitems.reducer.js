import { combineReducers } from 'redux';
import * as types from './galleryitems.types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.GALLERYITEMS_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = {};
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          // isConfirmed: true,
        };
      });
      return newState;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.GALLERYITEMS_FETCH_COMPLETED: {
      return action.payload.order;
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.GALLERYITEMS_FETCH_STARTED: {
      return true;
    }
    case types.GALLERYITEMS_FETCH_COMPLETED: {
      return false;
    }
    case types.GALLERYITEMS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};
const error = (state = null, action) => {
  switch(action.type) {
    case types.GALLERYITEMS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.GALLERYITEMS_FETCH_STARTED: {
      return null;
    }
    case types.GALLERYITEMS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  byId,
  order,
  isFetching,
  error
});

export const getGalleryItem = (state, id) => state.byId[id];
export const getGalleryItems = state => state.order.map(id => getGalleryItem(state, id));
export const getIsFetchingGalleryItems = state => state.isFetching;
export const getFecthingGalleryItemsError = state => state.error;

