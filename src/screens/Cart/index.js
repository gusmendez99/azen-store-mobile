import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import sum from 'lodash/sum';
import {connect} from 'react-redux';

import * as selectors from '../../redux/root-reducer';
import CartItemPreview from '../../components/CartItemPreview/index';
import * as actions from '../../redux/coupon/coupon.actions';

const HOST_BASE_URL = "https://azenstore.herokuapp.com";

const validateCoupon = () => {

}

const Cart = ({cartItems, subtotal, onCouponFieldChange, onCouponValidate, couponField}) => {
  return(
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <ScrollView>	
        {cartItems && cartItems.map((item, i) => (
          <CartItemPreview 
          key={i}
          item={item}/>
        ))}
      </ScrollView>
      <View style={{flexDirection: 'column', alignItems:'center', justifyContent:'center', backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'center', alignItems: 'center'}}>
            {/* <Text>Coupon code</Text> */}
              <TextInput 
                style={{backgroundColor: '#f0f0f0', height: 50, borderRadius: 4, marginRight: 10}} 
                placeholder="Enter coupon code" 
                value={couponField}
                onChangeText={(input) => { onCouponFieldChange(input) }}
              />
              <TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 50, borderRadius: 5, padding: 20}]} onPress={() =>onCouponValidate()}>
                <Text style={{color: '#ffffff'}}>Validate Coupon</Text>
              </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', padding: 20, alignItems: 'center'}}>
          <Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
          <Text>Q{'Algunos quetzales'}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, padding: 20, alignItems: 'center'}}>
          <TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5}]} onPress={() => console.log('test')}>
            <Text style={{color: '#ffffff'}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  centerElement: {
    justifyContent: 'center', 
    alignItems: 'center'},
})
export default connect(
  state => ({
      cartItems: selectors.getCartItems(state),
      //subtotal: sum(selectors.getCartItems(state).map(cartItem =>  cartItem.quantity * selectors.getProduct(state, cartItem.product).price)),
      couponField: selectors.getCouponField(state),
  }),
  dispatch => ({
    onCouponFieldChange(input){
      dispatch(actions.couponFieldChange(input))
    },
    onCouponValidate(){
      dispatch(actions.startFetchingCoupon())
    }
  })
)(Cart);