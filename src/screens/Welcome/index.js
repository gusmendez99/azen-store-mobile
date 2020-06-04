import React from "react";
import { AppStyles } from "../../AppStyles";
//import firebase from "react-native-firebase";


import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Block, Text, theme, Button } from "../../components/UIComponents";

const { width, height } = Dimensions.get("screen");


class Welcome extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    //this.tryToLoginFirst();
  }

  render() {
    // if (this.state.isLoading == true) {
    //   return (
    //     <ActivityIndicator
    //       style={styles.spinner}
    //       size="large"
    //       color={AppStyles.color.tint}
    //     />
    //   );
    // }
    /* return (
      <View style={styles.container}>
        <Text style={styles.title}>Say hello to your new app</Text>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          
        >
          Log In
        </Button>
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
        >
          Sign Up
        </Button>
      </View>
    ); */

    return (
      <Block flex middle>
        <ImageBackground
          source={{ uri: "https://raw.githubusercontent.com/creativetimofficial/argon-react-native/master/assets/imgs/register-bg.png" }}
          style={{ width, height, zIndex: 1, marginTop: 100 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" h4>
                  Azen Store
                </Text>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    #1 Gadgets Store App
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    
                    <Block middle>
                      <Button round uppercase color="primary" style={styles.createButton} onPress={() => this.props.navigation.navigate("Login")}>
                        <Text bold size={14} color={theme.COLORS.WHITE}>
                          LOGIN
                        </Text>
                      </Button>
                      <Button round color="#fff" style={styles.createButton} onPress={() => this.props.navigation.navigate("Signup")}>
                        <Text bold size={14} color={theme.COLORS.PRIMARY}>
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
    )






  }

  //async tryToLoginFirst() {
  //   const email = await AsyncStorage.getItem("@loggedInUserID:key");
  //   const password = await AsyncStorage.getItem("@loggedInUserID:password");
  //   const id = await AsyncStorage.getItem("@loggedInUserID:id");
  //   if (
  //     id != null &&
  //     id.length > 0 &&
  //     password != null &&
  //     password.length > 0
  //   ) {
  //     firebase
  //       .auth()
  //       .signInWithEmailAndPassword(email, password)
  //       .then(user => {
  //         const { navigation } = this.props;
  //         firebase
  //           .firestore()
  //           .collection("users")
  //           .doc(id)
  //           .get()
  //           .then(function(doc) {
  //             var dict = {
  //               id: id,
  //               email: email,
  //               profileURL: doc.photoURL,
  //               fullname: doc.displayName
  //             };
  //             if (doc.exists) {
  //               navigation.dispatch({
  //                 type: "Login",
  //                 user: dict
  //               });
  //             }
  //           })
  //           .catch(function(error) {
  //             const { code, message } = error;
  //             alert(message);
  //           });
  //         this.state.isLoading = false;
  //       })
  //       .catch(error => {
  //         const { code, message } = error;
  //         alert(message);
  //         // For details of error codes, see the docs
  //         // The message contains the default Firebase string
  //         // representation of the error
  //       });
  //     return;
  //   }
  //   const fbToken = await AsyncStorage.getItem(
  //     "@loggedInUserID:facebookCredentialAccessToken"
  //   );
  //   if (id != null && id.length > 0 && fbToken != null && fbToken.length > 0) {
  //     const credential = firebase.auth.FacebookAuthProvider.credential(fbToken);
  //     firebase
  //       .auth()
  //       .signInWithCredential(credential)
  //       .then(result => {
  //         var user = result.user;
  //         var userDict = {
  //           id: user.uid,
  //           fullname: user.displayName,
  //           email: user.email,
  //           profileURL: user.photoURL
  //         };
  //         this.props.navigation.dispatch({
  //           type: "Login",
  //           user: userDict
  //         });
  //       })
  //       .catch(error => {
  //         this.setState({ isLoading: false });
  //       });
  //     return;
  //   }
  //   this.setState({ isLoading: false });
  // }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.4,
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
    borderColor: "#8898AA",
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

export default Welcome;
