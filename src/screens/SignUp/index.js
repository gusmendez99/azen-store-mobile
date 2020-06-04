import React, { useState } from 'react';
//import { StyleSheet, Text, TextInput, View } from 'react-native';
import { StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  View 
} from 'react-native';
import { Text, Input, Button, Block, Icon, theme } from '../../components/UIComponents';
//import Button from 'react-native-button';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const FBSDK = require('react-native-fbsdk');

const { LoginManager, AccessToken } = FBSDK;
const { width, height } = Dimensions.get("screen");

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

const renderInput = ({ input: { onChange, ...input }, meta: {error}, ...rest }) => {
  return (
    <>
      <Input
        onChangeText={onChange}
        {...input}
        {...rest}
      />
      <Text muted>{ error }</Text>
    </>
  );
};

const Signup = ({ onRegister, registerWithFacebook, handleSubmit }) => {

  return (
    /* <View style={styles.container}>
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
    </View> */

    <Block flex middle>
        <ImageBackground
          source={{ uri: "https://raw.githubusercontent.com/creativetimofficial/argon-react-native/master/assets/imgs/register-bg.png" }}
          style={{ width, height, zIndex: 1, marginTop: 100 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign Up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button round style={{ ...styles.socialButtons }} onPress={() => onPressFacebook(registerWithFacebook)}>
                    <Block row>
                      <Icon
                        name="logo-facebook"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>FACEBOOK</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
        
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
                    </Block>
                    <Block row width={width * 0.75}>

                    </Block>
                    <Block middle>
                      <Button round color="primary" style={styles.createButton} onPress={handleSubmit(onRegister)}>
                        <Text bold size={14} color={theme.COLORS.WHITE}>
                          SIGN UP
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    marginTop: -64,
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: theme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: theme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});


const mapDispatchToProps = dispatch => ({
  onRegister(values) {
    const { username, password1, password2, email } = values;
    if( username && password1 && password2 && email) {
      if (
        username.length < 8 ||
        password1.length < 8 ||
        password2.length < 8
      ) {
        alert('Please check fields.');
        return;
      }
      dispatch(actions.startRegister(username, password1, password2, email));

    } else {
      alert('Please fill out the required fields.');
      return 
    }
  },
  registerWithFacebook(access_token) {
    dispatch(actions.startFacebookAuth(access_token));
  },
})

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length < 8 || values.username.length > 15) {
    errors.username = 'Must be 8 - 15 characters'
  }

  if (!values.password1) {
    errors.password1 = 'Required'
  } else if (values.password1.length < 8) {
    errors.password1 = 'Must be at least 8 characters'
  }

  if (!values.password2) {
    errors.password2 = 'Required'
  } else if (values.password2.length < 8) {
    errors.password2 = 'Must be at least 8 characters'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  /**/
  
  return errors
}

export default connect(
  undefined,
  mapDispatchToProps
)(
  reduxForm({ form: 'register-form', validate })(Signup)
);

