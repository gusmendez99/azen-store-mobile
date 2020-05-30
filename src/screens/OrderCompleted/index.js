import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

const OrderCompleted = ({ navigation }) => {

  const navigateToProfile = () => {
    console.log('Stating to navigate to Profile...')
    navigation.navigate('Profile')
  }


  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={{ uri: "https://apostille-express.ie/wp-content/uploads/2016/08/if_circle-check_Green.png" }} />
      <Text style={styles.title}>Order Placed</Text>
      <Text style={styles.description}>We will send you an email with your invoice. Thanks for your purchase </Text>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => navigateToProfile()}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingTop: 50,
  },
  icon: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 22,
    color: "#5F6D7A"
  },
  description: {
    marginTop: 20,
    textAlign: 'center',
    color: "#A9A9A9",
    fontSize: 16,
    margin: 40,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
  }
});

export default OrderCompleted;