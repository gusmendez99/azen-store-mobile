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
import { persistStore, persistReducer } from 'redux-persist';
import Reactotron from '../../ReactotronConfig'
//import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from './root-reducer';
import rootSaga from './root-saga';

import AsyncStorage from '@react-native-community/async-storage';

//const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: []
}

const persistedReducer = persistReducer(persistConfig, reducer)

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }
export const store = createStore(persistedReducer,compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()));
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga);
