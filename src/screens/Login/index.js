import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
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
    <TextInput
      style={styles.body}
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
      <View style={styles.InputContainer}>
        <Field
          name={'username'}
          props={{
            placeholder: 'Username',
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'password'}
          props={{
            placeholder: 'Password',
            secureTextEntry: true,
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={handleSubmit(onSubmit)}>
        Log in
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button
        containerStyle={styles.facebookContainer}
        style={styles.facebookText}
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
  leftCenter: {
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
