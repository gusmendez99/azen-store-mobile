import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "react-native-button";
import {connect} from 'react-redux';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

import * as actions from '../../redux/auth/auth.actions';

import { AppStyles } from "../../AppStyles";



onRegister = () => {
  const { email, password } = this.state;

};
const onPressFacebook = (registerWithFacebook) => {
  LoginManager.logInWithPermissions(["email", "public_profile"]).then(
    function(result) {
      if (result.isCancelled) {
        alert('Login was cancelled, please try again!');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          console.log("data",data);
          registerWithFacebook(data.accessToken);
        })
      }
    },
    function(error) {
      alert('Login failed with error: ' + error);
    }
  );
}

const Signup = ({onRegister, registerWithFacebook}) => {
  const [username, changeUsername ] = useState("");
  const [email, changeEmail ] = useState("");
  const [password1, changePassword1 ] = useState("");
  const [password2, changePassword2 ] = useState("");
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.centerTitle]}>Create new account</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Pick a username"
          onChangeText={text => changeUsername(text)}
          value={username}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Your email"
          onChangeText={text => changeEmail(text) }
          value={email}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Create a password"
          secureTextEntry={true}
          onChangeText={text => changePassword1(text)}
          value={password1}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Confirm your password"
          secureTextEntry={true}
          onChangeText={text => changePassword2(text)}
          value={password2}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={[styles.loginContainer, { marginTop: 50 }]}
        style={styles.loginText}
        onPress={() => onRegister(username, password1, password2, email)}
      >
        Sign Up
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button
        containerStyle={styles.facebookContainer}
        style={styles.facebookText}
        onPress={() => onPressFacebook(registerWithFacebook)}
      >
        Sign Up With Facebook
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
    or: {
    fontFamily: AppStyles.fontName.main,
    color: "black",
    marginTop: 40,
    marginBottom: 10
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  centerTitle: {
    alignSelf: "stretch",
    textAlign: "center",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default connect(
  undefined,
  dispatch => ({
    onRegister(username, password1,password2, email){
      if (username.length <= 0 || password1.length <= 0 || password2.length <= 0 || email.length <= 0) {
        alert("Please fill out the required fields.");
        return;
      }
      dispatch(actions.startRegister(username, password1,password2, email));
    },
    registerWithFacebook(access_token){
      dispatch(actions.startFacebookAuth(access_token));
    }
  })
)(Signup);
