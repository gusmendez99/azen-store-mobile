import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
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

const Signup = ({ onRegister, registerWithFacebook, handleSubmit }) => {
  const renderInput = ({ input: { onChange, ...input }, ...rest }) => {
    return (
      <TextInput
        style={styles.body}
        onChangeText={onChange}
        {...input}
        {...rest}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.centerTitle]}>Create new account</Text>
      <View style={styles.InputContainer}>
        <Field
          name={'username'}
          props={{
            placeholder: 'Pick a username...',
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'email'}
          props={{
            placeholder: 'Enter your email...',
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'password1'}
          props={{
            placeholder: 'Create your password',
            secureTextEntry: true,
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'password2'}
          props={{
            placeholder: 'Confirm your password',
            secureTextEntry: true,
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <Button
        containerStyle={[styles.loginContainer, { marginTop: 50 }]}
        style={styles.loginText}
        onPress={handleSubmit(onRegister)}>
        Sign Up
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button
        containerStyle={styles.facebookContainer}
        style={styles.facebookText}
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
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  centerTitle: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
});

export default reduxForm({ form: 'register-form' })(
  connect(
    undefined,
    dispatch => ({
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
    }),
  )(Signup),
);
