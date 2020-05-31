import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as selectors from '../root-reducer';
import * as actions from './payment.actions';
import * as types from './payments.types';
import * as schemas from './payment.schemas';


const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';
function* fetchPaymentItems(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const userId = yield select(selectors.getAuthUserID);
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/payments?user=${userId}`,
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
        const {
          entities: { paymentItems },
          result,
        } = normalize(jsonResult, schemas.paymentItems);

        yield put(
          actions.completeFetchingPaymentItems(
            paymentItems,
            result,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingPaymentItems(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingPaymentItems(error.message));
  }
}

export function* watchPaymentItemsFetch() {
  yield takeEvery(
    types.PAYMENT_ITEMS_FETCH_STARTED,
    fetchPaymentItems,
  );
}


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
          body: JSON.stringify({...action.payload, user: authUserId, amount: coupon === null ? order.total : order.total - coupon.discount }),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const jsonResult = yield response.json();
        yield put(actions.completepostingPayment(jsonResult));
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