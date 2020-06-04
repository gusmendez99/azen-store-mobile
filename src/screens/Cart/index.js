import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedLoader from 'react-native-animated-loader';
import { connect } from 'react-redux';

import { theme, Button, Input } from '../../components/UIComponents';

import * as selectors from '../../redux/root-reducer';
import CartItemPreview from '../../components/CartItemPreview/index';
import * as actions from '../../redux/coupon/coupon.actions';

const Cart = ({ cartItems, subtotal, onCouponFieldChange, onCouponValidate, couponField, coupon, couponError, isFetchingCoupon, navigation }) => {
  const navigateToCheckout = () => {
    console.log('Stating to navigate to Checkout...')
    navigation.navigate('Checkout')
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <ScrollView>
        {cartItems && cartItems.map((item, i) => (
          <CartItemPreview
            key={i}
            item={item} />
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            {/* <Text>Coupon code</Text> */}

            <View style={styles.inputContainer}>
              <Input 
                placeholder="Enter coupon code..."
                value={couponField}
                onChangeText={(input) => { onCouponFieldChange(input) }} />

              {
                couponError && (
                  <MaterialIcons style={[styles.icon, styles.inputIcon]} name={"close"} size={26} color={"#f44336"} />
                )
              }

              {
                coupon && coupon.discount && (
                  <MaterialIcons style={[styles.icon, styles.inputIcon]} name={"check-circle"} size={26} color={"#4caf50"} />
                )
              }
            </View>

            {
              isFetchingCoupon ? (
                <AnimatedLoader visible={true} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} speed={1} />
              ) : (
                  <Button 
                  style={{ width: "30%", height: 50, marginRight: 24 }} 
                  onPress={() => onCouponValidate()}
                  round
                  size='small'>
                    Validate
                  </Button>
                )
            }


          </View>
        </View>
        <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
          <Text style={{ color: theme.COLORS.GREY, fontSize: theme.SIZES.BASE }}>Total: </Text>
          <Text style={{ color: theme.COLORS.BLACK, fontSize: theme.SIZES.BASE }}>Q{
            coupon ? (
                subtotal - (subtotal * (parseFloat(coupon.discount) / 100))
            ) : (
              subtotal
            ) 
          }</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 20, alignItems: 'center' }}>
          <Button
          color="success"
          round
          size = 'small' 
          onPress={() => navigateToCheckout()}>
            Checkout
          </Button>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: "55%",
    marginHorizontal: 6
  },
  inputs: {
    height: 45,
    marginRight: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    justifyContent: 'center'

  },
  lottie: { 
    width: 100, 
    height: 100, 
  }
})

const mapStateToProps = state => ({
  cartItems: selectors.getCartItems(state),
  subtotal: selectors.getCartSubtotal(state),
  couponField: selectors.getCouponField(state),
  coupon: selectors.getCoupon(state),
  couponError: selectors.getFetchingCouponError(state),
  isFetchingCoupon: selectors.getIsFetchingCoupon(state)
})

const mapDispatchToProps = dispatch => ({
  onCouponFieldChange(input) {
    dispatch(actions.couponFieldChange(input))
  },
  onCouponValidate() {
    dispatch(actions.startFetchingCoupon())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);