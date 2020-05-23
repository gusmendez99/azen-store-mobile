/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import { AppStyles } from "./src/AppStyles";

import Login from './src/screens/Login/index';
import SignUp from './src/screens/SignUp/index';
import Welcome from './src/screens/Welcome/index';
import Categories from './src/screens/Categories/index';


import * as selectors from './src/redux/root-reducer'

const productStack = createStackNavigator();
function productStackNavigator (){
  return (
    <>
      <productStack.Navigator>
        <productStack.Screen name="Categories" component={Categories} />

        {/* Acá podes meter las pantallas de Products y Product DetaiL 
        <productStack.Screen name="Login" component={Login} />
        <productStack.Screen name="Signup" component={SignUp} /> */}
      </productStack.Navigator>
    </>
  );

}
const authStack = createStackNavigator();
function  AuthStackNavigator ()  {
    return (
      <>
        <authStack.Navigator>
          <authStack.Screen name="Welcome" component={Welcome} />
          <authStack.Screen name="Login" component={Login} />
          <authStack.Screen name="Signup" component={SignUp} />
        </authStack.Navigator>
      </>
    );
}

const Tab = createBottomTabNavigator();

const App = ({
  isAuthenticated = false
}) =>  {
  return (
    <>
      <NavigationContainer>
        {isAuthenticated  ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = 'th-large';
                } else if (route.name === 'Search') {
                  iconName = 'Search'
                }

                // You can return any component that you like here!
                return <FontAwesome5 name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: AppStyles.color.main,
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Home" component={productStackNavigator} />
        
          </Tab.Navigator>
        ) : (
          <>
            <AuthStackNavigator />
          </>
        )}
      </NavigationContainer>
    </>
  );
};

export default connect(
  state => ({
    isAuthenticated: selectors.isAuthenticated(state),
  }),
  undefined
)
(App);
