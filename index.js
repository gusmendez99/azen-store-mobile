if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './src/redux/store';

import { theme, withTheme, ThemeProvider } from './src/theme'

const customTheme = {
  SIZES: { BASE: 16, },
  // this will overwrite the Theme SIZES BASE value 16
  COLORS: { PRIMARY: '#2196f3', } 
  // this will overwrite the Theme COLORS PRIMARY color #B23AFC
};

const Root = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
      </PersistGate>
    </Provider>
)
AppRegistry.registerComponent(appName, () => Root);
