import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../../AppStyles";
// import firebase from "react-native-firebase";
// import { AsyncStorage } from "react-native";
// const FBSDK = require("react-native-fbsdk");
// const { LoginManager, AccessToken } = FBSDK;
import {connect} from 'react-redux';
import * as actions from '../../redux/auth/auth.actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: "",
      password: ""
    };
  }

  onPressLogin = () => {
    const { email, password } = this.state;
    if (email.length <= 0 || password.length <= 0) {
      alert("Please fill out the required fields.");
      return;
    }
    else {
      this.props.onClick();
    }
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(response => {
    //     const { navigation } = this.props;
    //     user_uid = response.user._user.uid;
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(user_uid)
    //       .get()
    //       .then(function(user) {
    //         if (user.exists) {
    //           AsyncStorage.setItem("@loggedInUserID:id", user_uid);
    //           AsyncStorage.setItem("@loggedInUserID:key", email);
    //           AsyncStorage.setItem("@loggedInUserID:password", password);
    //           navigation.dispatch({ type: "Login", user: user });
    //         } else {
    //           alert("User does not exist. Please try again.");
    //         }
    //       })
    //       .catch(function(error) {
    //         const { code, message } = error;
    //         alert(message);
    //       });
    //   })
    //   .catch(error => {
    //     const { code, message } = error;
    //     alert(message);
    //     // For details of error codes, see the docs
    //     // The message contains the default Firebase string
    //     // representation of the error
    //   });
  };

  onPressFacebook = () => {
    return 
    // LoginManager.logInWithReadPermissions([
    //   "public_profile",
    //   "user_friends",
    //   "email"
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
    //               email: user.email,
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftCenter]}>Sign In</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail or phone number"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => this.onPressLogin()}
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
    onClick(){
      dispatch(actions.completeLogin('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTg4MDE1OTI4LCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIm9yaWdfaWF0IjoxNTg4MDEyMzI4fQ.GwtD0RMQeK1ID9eMDa6BDM7VXqeMmwD-wWPV8VfrLeo'))
    }
  })
)(Login);
