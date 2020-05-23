import * as types from './categories.types'
import { combineReducers } from 'redux';

const categories = (state = [], action) => {
    switch(action.type){
        case types.CATEGORY_FETCH_COMPLETED: {
            return action.payload.categories
        }
        default: {
            return state;
        }
    }
};

const isFetching = (state = false, action) => {
    switch(action.type) {
      case types.CATEGORY_FETCH_STARTED: {
        return true;
      }
      case types.CATEGORY_FETCH_COMPLETED: {
        return false;
      }
      case types.CATEGORY_FETCH_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
  };
  
  const error = (state = null, action) => {
    switch(action.type) {
      case types.CATEGORY_FETCH_FAILED: {
        return action.payload.error;
      }
      case types.CATEGORY_FETCH_STARTED: {
        return null;
      }
      case types.CATEGORY_FETCH_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
  };

  export default combineReducers({
      categories,
      isFetching,
      error
  });

  export const getCategories= state => state.categories;
  export const getIsFetchingCategories = state => state.isFetching;
  export const getFetchingCategoriesError = state => state.error;