import * as types from './review.types';
 
export const startFetchingReviews = idProduct => ({
  type: types.FETCH_REVIEWS_STARTED,
  payload: { idProduct }
})

export const completeFetchingReviews = (entities, order) => ({
  type: types.FETCH_REVIEWS_COMPLETED,
  payload: {
    entities,
    order,
  },
})

export const failFetchingReviews = error => ({
  type: types.FETCH_REVIEWS_FAILED,
  payload: { error },
})

export const startPostingReview = (reviewData) => ({
  type: types.POST_REVIEW_STARTED,
  payload: { reviewData },
});

export const completePostingReview = (review) => ({
  type: types.POST_REVIEW_COMPLETED,
  payload: {
    review
  },
});

export const failPostingReview = (error) => ({
  type: types.POST_REVIEW_FAILED,
  payload: {
    error
  },
});