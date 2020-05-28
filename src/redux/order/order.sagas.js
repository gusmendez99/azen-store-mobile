import {
  call,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';

import * as selectors from '../root-reducer';
import * as actions from './order.actions';
import * as types from './order.types';

import * as invoiceActions from '../invoice/invoice.actions';



const API_BASE_URL = 'http://azenstore.herokuapp.com/api/v1';

function* postOrder(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const authUserId = yield select(selectors.getAuthUserID);
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/orders/`,
        {
          method: 'POST',
          body: JSON.stringify({...action.payload.orderData, user: authUserId}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const jsonResult = yield response.json();
        yield put(actions.completepostingOrder(jsonResult));
        yield put(invoiceActions.startpostingInvoice({...action.payload.invoiceData, order: jsonResult.id}));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failpostingOrder(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failpostingOrder('Server error'));
  }
}

export function* watchPostOrder() {
  yield takeEvery(
    types.POST_ORDER_STARTED,
    postOrder,
  );
}