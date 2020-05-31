import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  select,
} from 'redux-saga/effects';
import moment from "moment";

import * as selectors from '../root-reducer';
import * as actions from './coupon.actions';
import * as types from './coupon.types';


const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';

export function* fetchCoupon(action){
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const name = yield select(selectors.getCouponField);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/coupons?name=${name}`,
        {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const jsonResult = yield response.json();
        console.log(jsonResult)

        // Check if exp_datetime 
        const expDate = new Date(jsonResult[0].exp_datetime)
        const isValidCoupon = moment(new Date()).isSameOrBefore(expDate);

        if(isValidCoupon){
          yield put(actions.completeFetchingCoupon(jsonResult[0]));
        } else {
          yield put(actions.failFetchingCoupon("This coupon has expired"));
        }        
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingCoupon(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingCoupon('Server Error'));
  }
}
export function* watchCouponFetch() {
  yield takeEvery(
    types.COUPON_FETCH_STARTED,
    fetchCoupon,
  );
}
