import { combineReducers } from 'redux';
import * as types from './review.types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_REVIEWS_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = {  };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
        };
      });

      return newState;
    }
    case types.POST_REVIEW_COMPLETED: {
      const { review } = action.payload;
      return {
        ...state,
        [review.id] : review
    };
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_REVIEWS_COMPLETED: {
      const { order } = action.payload;
      return [...order];
    }
    case types.POST_REVIEW_COMPLETED: {
      const { review } = action.payload
      return [...state, review.id]
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.FETCH_REVIEWS_STARTED: {
      return true;
    }
    case types.FETCH_REVIEWS_COMPLETED: {
      return false;
    }
    case types.FETCH_REVIEWS_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const fetchError = (state = null, action) => {
  switch(action.type) {
    case types.FETCH_REVIEWS_FAILED: {
      return action.payload.error;
    }
    case types.FETCH_REVIEWS_STARTED: {
      return null;
    }
    case types.FETCH_REVIEWS_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const isPosting = (state = false, action) => {
  switch(action.type) {
    case types.POST_REVIEW_STARTED: {
      return true;
    }
    case types.POST_REVIEW_COMPLETED: {
      return false;
    }
    case types.POST_REVIEW_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const postError = (state = null, action) => {
  switch(action.type) {
    case types.POST_REVIEW_FAILED: {
      return action.payload.error;
    }
    case types.POST_REVIEW_STARTED: {
      return null;
    }
    case types.POST_REVIEW_COMPLETED: {
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
  isPosting,
  fetchError,
  postError
})

export const getReview = (state, id) => state.byId[id];
export const getReviews = state => state.order.map(id => getReview(state, id));
export const getIsFetchingReview = state => state.isFetching;
export const getFecthingReviewError = state => state.fetchError;
export const getIsPostingReview = (state) => state.isPosting;
export const getPostingReviewError = (state) => state.postReviewError;