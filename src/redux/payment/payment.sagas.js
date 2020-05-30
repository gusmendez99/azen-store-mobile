import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';

import * as selectors from '../root-reducer';
import * as actions from './payment.actions';
import * as types from './payments.types';

import * as RootNavigation from '../../RootNavigation.js';

const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';

function* postPayment(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const authUserId = yield select(selectors.getAuthUserID);
      const order = yield select(selectors.getOrder);
      const coupon = yield select(selectors.getCoupon);
      
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/payments/`,
        {
          method: 'POST',
          body: JSON.stringify({...action.payload, user: authUserId, amount: coupon === null ? order.total : order.total - (order.total * (parseFloat(coupon.discount) / 100)) }),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const jsonResult = yield response.json();
        yield put(actions.completepostingPayment(jsonResult));
        // Finally, we can navigate to OrderCompleted Screen
        RootNavigation.navigate('OrderCompleted');

      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failpostingPayment(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failpostingPayment('Server error'));
  }
}

export function* watchPostPayment() {
  yield takeEvery(
    types.POST_PAYMENT_STARTED,
    postPayment,
  );
}