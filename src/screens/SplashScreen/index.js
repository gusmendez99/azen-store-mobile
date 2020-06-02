import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../redux/auth/auth.actions';


const SplashScreen = ({ onRefresh, reviewTime = 10000 }) => {
  useEffect(
    () => {
      const interval = setInterval(onRefresh, reviewTime);
      return () => {
        clearInterval(interval);
      };
    },
    []
  );
  return null;
};


export default connect(
  undefined,
  dispatch => ({

  }),
)(SplashScreen);