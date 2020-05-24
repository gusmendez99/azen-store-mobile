// import {createStore, applyMiddleware} from 'redux';
// import logger from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';

// import reducer from './root-reducer';
// import rootSaga from './root-saga';

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }
// export const store = createStore(reducer, applyMiddleware(...middlewares));

// sagaMiddleware.run(rootSaga);

import {createStore, applyMiddleware, compose} from 'redux';
import Reactotron from '../../ReactotronConfig'
//import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from './root-reducer';
import rootSaga from './root-saga';


//const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }
export const store = createStore(reducer,compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()));

sagaMiddleware.run(rootSaga);
