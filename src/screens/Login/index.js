import React from 'react';
import { StyleSheet,  View } from 'react-native';
import { Text, Input, Button } from '../../components/UIComponents';
//import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import { connect } from 'react-redux';
import * as actions from '../../redux/auth/auth.actions';

import { Field, reduxForm } from 'redux-form';

const FBSDK = require('react-native-fbsdk');
const { LoginManager, AccessToken } = FBSDK;

const onPressFacebook = loginWithFacebook => {
  LoginManager.logOut();
  LoginManager.logInWithPermissions(['email', 'public_profile']).then(
    function (result) {
      if (result.isCancelled) {
        alert('Login was cancelled, please try again!');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          console.log('data', data);
          loginWithFacebook(data.accessToken);
        });
      }
    },
    function (error) {
      alert('Login failed with error: ' + error);
    },
  );
};

const renderInput = ({ input: { onChange, ...input }, ...rest }) => {
  return (
    <Input
      onChangeText={onChange}
      {...input}
      {...rest}
    />
  );
};

const Login = ({ onSubmit, loginWithFacebook, handleSubmit }) => {
  

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftCenter]}>Sign In</Text>
        <Field
          name={'username'}
          style={styles.input}
          props={{
            placeholder: 'Username',
            rounded: true,
            borderless: true,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
        <Field
          name={'password'}
          style={styles.input}
          props={{
            placeholder: 'Password',
            rounded: true,
            borderless: true,
            underlineColorAndroid: 'transparent',
            password: true,
            viewPass: true,
          }}
          component={renderInput}
        />
      <Button
        round 
        uppercase
        color="success"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        Log in
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button
        round 
        uppercase
        style={styles.button}
        onPress={() => onPressFacebook(loginWithFacebook)}>
        Log in with facebook
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  leftCenter: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  input: {
    marginVertical: 4,
  },
  button: {
    marginVertical: 8,
  },
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    const { username, password } = values;
    console.log('Credentials: ' + username + ', ' + password);
    if (username.length <= 0 || password.length <= 0) {
      alert('Please fill out the required fields.');
      return;
    }
    dispatch(actions.startLogin(username, password));
  },
  loginWithFacebook(access_token) {
    dispatch(actions.startFacebookAuth(access_token));
  },
})

export default connect(
  undefined,
  mapDispatchToProps
)(
  reduxForm({ form: 'login-form' })(Login)
);
