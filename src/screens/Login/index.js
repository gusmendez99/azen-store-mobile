import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../../AppStyles";
// import firebase from "react-native-firebase";
// import { AsyncStorage } from "react-native";
// const FBSDK = require("react-native-fbsdk");
// const { LoginManager, AccessToken } = FBSDK;
import {connect} from 'react-redux';
import * as actions from '../../redux/auth/auth.actions';



// onPressLogin = (username, password, onSubmit) => {
//   if (username.length <= 0 || password.length <= 0) {
//     alert("Please fill out the required fields.");
//     return;
//   }
//   else {
//     onSubmit(username, password);
//   }
// };

onPressFacebook = () => {
  return 
  // LoginManager.logInWithReadPermissions([
  //   "public_profile",
  //   "user_friends",
  //   "username"
  // ]).then(
  //   result => {
  //     if (result.isCancelled) {
  //       alert("Whoops!", "You cancelled the sign in.");
  //     } else {
  //       AccessToken.getCurrentAccessToken().then(data => {
  //         const credential = firebase.auth.FacebookAuthProvider.credential(
  //           data.accessToken
  //         );
  //         const accessToken = data.accessToken;
  //         firebase
  //           .auth()
  //           .signInWithCredential(credential)
  //           .then(result => {
  //             var user = result.user;
  //             AsyncStorage.setItem(
  //               "@loggedInUserID:facebookCredentialAccessToken",
  //               accessToken
  //             );
  //             AsyncStorage.setItem("@loggedInUserID:id", user.uid);
  //             var userDict = {
  //               id: user.uid,
  //               fullname: user.displayName,
  //               username: user.username,
  //               profileURL: user.photoURL
  //             };
  //             var data = {
  //               ...userDict,
  //               appIdentifier: "rn-android-universal-listings"
  //             };
  //             firebase
  //               .firestore()
  //               .collection("users")
  //               .doc(user.uid)
  //               .set(data);
  //             this.props.navigation.dispatch({
  //               type: "Login",
  //               user: userDict
  //             });
  //           })
  //           .catch(error => {
  //             alert("Please try again! " + error);
  //           });
  //       });
  //     }
  //   },
  //   error => {
  //     Alert.alert("Sign in error", error);
  //   }
  // );
};
const Login = ({onSubmit}) => {
  const  [username, changeUsername ] = useState("");
  const  [password, changePassword ] = useState("");
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftCenter]}>Sign In</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Ursername"
          onChangeText={text => changeUsername(text)}
          value={username}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={text => changePassword(text)}
          value={password}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => onSubmit(username, password)}
      >
        Log in
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button
        containerStyle={styles.facebookContainer}
        style={styles.facebookText}
        onPress={() => this.onPressFacebook()}
      >
        Login with Facebook
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
  leftCenter: {
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
    onSubmit(username, password) {
      if (username.length <= 0 || password.length <= 0) {
        alert("Please fill out the required fields.");
        return;
      }
      dispatch(actions.startLogin(username, password));
    },
  })
)(Login);
