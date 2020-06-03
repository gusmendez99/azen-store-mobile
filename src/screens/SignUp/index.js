import React, { useState } from 'react';
//import { StyleSheet, Text, TextInput, View } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '../../components/UIComponents';
//import Button from 'react-native-button';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const FBSDK = require('react-native-fbsdk');

const { LoginManager, AccessToken } = FBSDK;

import * as actions from '../../redux/auth/auth.actions';

import { AppStyles } from '../../AppStyles';

const onPressFacebook = registerWithFacebook => {
  LoginManager.logInWithPermissions(['email', 'public_profile']).then(
    function (result) {
      if (result.isCancelled) {
        alert('Login was cancelled, please try again!');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          console.log('data', data);
          registerWithFacebook(data.accessToken);
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

const Signup = ({ onRegister, registerWithFacebook, handleSubmit }) => {

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.centerTitle]}>Create new account</Text>
        <Field
          name={'username'}
          props={{
            placeholder: 'Pick a username...',
            rounded: true,
            borderless: true,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
        <Field
          name={'email'}
          props={{
            placeholder: 'Enter your email...',
            type: "email-address",
            rounded: true,
            borderless: true,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      <Field
          name={'password1'}
          props={{
            placeholder: 'Create your password',
            rounded: true,
            borderless: true,
            underlineColorAndroid: 'transparent',
            password: true,
            viewPass: true,
          }}
          component={renderInput}
        />
        <Field
          name={'password2'}
          props={{
            placeholder: 'Confirm your password',
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
        onPress={handleSubmit(onRegister)}>
        Sign Up
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button
        round 
        uppercase
        style={styles.button}
        onPress={() => onPressFacebook(registerWithFacebook)}>
        Sign Up With Facebook
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
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
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
  onRegister(values) {
    const { username, password1, password2, email } = values;
    if (
      username.length <= 0 ||
      password1.length <= 0 ||
      password2.length <= 0 ||
      email.length <= 0
    ) {
      alert('Please fill out the required fields.');
      return;
    }
    dispatch(actions.startRegister(username, password1, password2, email));
  },
  registerWithFacebook(access_token) {
    dispatch(actions.startFacebookAuth(access_token));
  },
})

export default connect(
  undefined,
  mapDispatchToProps
)(
  reduxForm({ form: 'register-form' })(Signup)
);

