import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';

import * as selectors from '../root-reducer';
import * as actions from './invoice.actions';
import * as types from './invoice.types';

import * as paymentActions from '../payment/payment.actions';


const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';

function* postInvoice(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/invoices/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const jsonResult = yield response.json();
        yield put(actions.completepostingInvoice(jsonResult));
        yield put(paymentActions.startpostingPayment({invoice: jsonResult.id }))
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failpostingInvoice(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failpostingInvoice('Server error'));
  }
}

export function* watchPostInvoice() {
  yield takeEvery(
    types.POST_INVOICE_STARTED,
    postInvoice,
  );
}