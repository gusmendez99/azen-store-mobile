/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, isMountedRef } from './src/RootNavigation';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppStyles } from "./src/AppStyles";

import Login from './src/screens/Login/index';
import SignUp from './src/screens/SignUp/index';
import Welcome from './src/screens/Welcome/index';
import Categories from './src/screens/Categories/index';
import Products from './src/screens/Products/index';
import ProductDetail from './src/screens/ProductDetail/index';
import Profile from './src/screens/Profile/index';
import ChangePassword from './src/screens/ChangePassword/index';
import Cart from './src/screens/Cart/index';
import Checkout from './src/screens/Checkout/index';
import Orders from './src/screens/Orders/index';
import Invoices from './src/screens/Invoices/index'
import Payments from './src/screens/Payments/index';
import OrderCompleted from './src/screens/OrderCompleted/index';
import Search from './src/screens/Search/index';
import Wishlist from './src/screens/Wishlist/index';

import TokenRefresh from './src/components/TokenRefresh';

import * as selectors from './src/redux/root-reducer'

const productStack = createStackNavigator();
function productStackNavigator (){
  return (
    <>
      <productStack.Navigator>
        <productStack.Screen name="Categories" component={Categories} />
        <productStack.Screen name="Products" component={Products}/>
        <productStack.Screen name="ProductDetail" component={ProductDetail}/>
      </productStack.Navigator>
    </>
  );
}

const wishlistStack = createStackNavigator();
function wishlistStackNavigator (){
  return (
    <>
      <wishlistStack.Navigator>
        <wishlistStack.Screen name="Wishlist" component={Wishlist} />
      </wishlistStack.Navigator>
    </>
  );
}

const searchStack = createStackNavigator();
function searchStackNavigator (){
  return (
    <>
      <searchStack.Navigator>
        <searchStack.Screen name="Search" component={Search} />
      </searchStack.Navigator>
    </>
  );
}

const cartStack = createStackNavigator();
function cartStackNavigator (){
  return (
    <>
      <cartStack.Navigator>
        <cartStack.Screen name="Cart" component={Cart} />
        <cartStack.Screen name="Checkout" component={Checkout} />
        <cartStack.Screen name="OrderCompleted" component={OrderCompleted} />
      </cartStack.Navigator>
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

const profileStack = createStackNavigator();
function profileStackNavigator (){
  return (
    <>
      <profileStack.Navigator>
        <profileStack.Screen name="Profile" component={Profile} />
        <profileStack.Screen name="ChangePassword" component={ChangePassword} />
        <profileStack.Screen name="Orders" component={Orders} />
        <profileStack.Screen name="Invoices" component={Invoices} />
        <profileStack.Screen name="Payments" component={Payments} />
      </profileStack.Navigator>
    </>
  );

}

const Tab = createBottomTabNavigator();

const App = ({
  isAuthenticated = false
}) =>  {

  useEffect(() => {
    isMountedRef.current = true;
    SplashScreen.hide();

    return () => (isMountedRef.current = false);
  }, []);


  return (
    <>
      
      <NavigationContainer ref={navigationRef}>
        {isAuthenticated  ? (
        <>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = 'th-large';
                } else if (route.name === 'Search') {
                  iconName = 'search'
                } else if (route.name === 'Profile') {
                  iconName = 'user-circle'
                } else if (route.name === 'Cart') {
                  iconName = 'shopping-cart'
                }
                else if (route.name === 'Wishlist') {
                  iconName = 'heart'
                }
                return <FontAwesome5 name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: AppStyles.color.primary,
              inactiveTintColor: AppStyles.color.gray,
            }}
          >
            <Tab.Screen name="Home" component={productStackNavigator} />
            <Tab.Screen name="Search" component={searchStackNavigator} />
            <Tab.Screen name="Profile" component={profileStackNavigator} />
            <Tab.Screen name="Cart" component={cartStackNavigator} />
            <Tab.Screen name="Wishlist" component={wishlistStackNavigator} />
          </Tab.Navigator>
          <TokenRefresh/>
        </>
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
