import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../../AppStyles";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistering: true,
      username: "",
      email: "",
      password1: "",
      password2: ""
    };
  }



  onRegister = () => {
    const { email, password } = this.state;

  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.centerTitle]}>Create new account</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Pick a username"
            onChangeText={text => this.setState({ username: text })}
            value={this.state.username}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Your email"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Create a password"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password1: text })}
            value={this.state.password1}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Confirm your password"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password2: text })}
            value={this.state.password2}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
          style={styles.facebookText}
          onPress={() => this.onRegister()}
        >
          Sign Up
        </Button>
        <Text style={styles.or}>OR</Text>
        
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
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default Signup;
