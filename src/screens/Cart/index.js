import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import * as selectors from '../../redux/root-reducer';
import CartItemPreview from '../../components/CartItemPreview/index';

const HOST_BASE_URL = "https://azenstore.herokuapp.com";

const Cart = ({cartItems}) => {
  return(
    <ScrollView>	
      {cartItems && cartItems.map((item, i) => (
        <CartItemPreview 
        key={i}
        item={item}/>
      ))}
    </ScrollView>
  )
};


export default connect(
  state => ({
    cartItems: selectors.getCartItems(state),
  }),
  undefined
)(Cart);