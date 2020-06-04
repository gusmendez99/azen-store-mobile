import React from 'react';
import { StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  View 
} from 'react-native';
import { Text, Input, Button, Block, Icon, theme } from '../../components/UIComponents';
//import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import { connect } from 'react-redux';
import * as actions from '../../redux/auth/auth.actions';

import { Field, reduxForm } from 'redux-form';

const FBSDK = require('react-native-fbsdk');

const { LoginManager, AccessToken } = FBSDK;
const { width, height } = Dimensions.get("screen");

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
    /*{ <View style={styles.container}>
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
    </View> }*/

    <Block flex middle>
        <ImageBackground
          source={{ uri: "https://raw.githubusercontent.com/creativetimofficial/argon-react-native/master/assets/imgs/register-bg.png" }}
          style={{ width, height, zIndex: 1, marginTop: 100 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Login with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons }} onPress={() => onPressFacebook(loginWithFacebook)}>
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
                    Or login the classic way
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
                      style={styles.input}
                      props={{
                        placeholder: 'Username',
                        rounded: true,
                        borderless: true,
                        underlineColorAndroid: 'transparent',
                      }}
                      component={renderInput}
                    />
        
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
                    </Block>
                    <Block row width={width * 0.75}>

                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={handleSubmit(onSubmit)}>
                        <Text bold size={14} color={theme.COLORS.WHITE}>
                          LOGIN
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
    height: height * 0.6,
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
