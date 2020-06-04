import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  View,
  ScrollView
} from 'react-native';
import { Text, Input, Button, Block, Icon, theme } from '../../components/UIComponents';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import AnimatedLoader from 'react-native-animated-loader';
import * as selectors from '../../redux/root-reducer';
import * as actions from "../../redux/order/order.actions";

import { AppStyles } from '../../AppStyles';

const { width, height } = Dimensions.get("screen");

const renderInput = ({ input: { onChange, ...input }, meta: { error }, ...rest }) => {
  return (
    <>
      <Input
        onChangeText={onChange}
        {...input}
        {...rest}
      />
      <Text muted>{error}</Text>
    </>
  );
};

const Checkout = ({ onCheckout, handleSubmit, subtotal, coupon, isPostingOrder, isPostingInvoice, isPostingPayment }) => {

  return (
    <ScrollView style={styles.scrollView}>
      
      {
         (isPostingOrder || isPostingInvoice || isPostingPayment) && (
            <AnimatedLoader visible={true} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} source={require('../../assets/loader/loader.json')} speed={1} />
          ) 
      }
      <Block flex middle>
        <ImageBackground
          source={{ uri: "https://raw.githubusercontent.com/creativetimofficial/argon-react-native/master/assets/imgs/register-bg.png" }}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" h5>
                  Order Details
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Text style={styles.socialTextButtons}>Total to pay: Q{
                    coupon ? (
                      subtotal - (subtotal * (parseFloat(coupon.discount) / 100))
                    ) : (
                        subtotal
                      )
                  }</Text>

                </Block>
              </Block>
              <Block flex>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8}>
                      <Field
                        name={'deliveryName'}
                        props={{
                          placeholder: 'Who do we send this products to? (perhaps your own name)',
                          rounded: true,
                          borderless: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />

                    </Block>

                    <Block width={width * 0.8} >
                      <Field
                        name={'deliveryAddress'}
                        props={{
                          placeholder: 'Where do we deliver this? (NASA address not allowed..)',
                          rounded: true,
                          borderless: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Field
                        name={'details'}
                        props={{
                          placeholder: 'Details.... Something else we have to know?',
                          rounded: true,
                          borderless: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />
                    </Block>
                    <Block row width={width * 0.75}>
                      <Text p>Invoice Details</Text>
                    </Block>
                    <Block width={width * 0.8} >
                      <Field
                        name={'billingName'}
                        props={{
                          placeholder: 'Billing Name',
                          rounded: true,
                          borderless: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />
                    </Block>
                    <Block width={width * 0.8} >
                      <Field
                        name={'billingAddress'}
                        props={{
                          placeholder: 'Billing Address',
                          rounded: true,
                          borderless: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />
                    </Block>
                    <Block width={width * 0.8} >
                      <Field
                        name={'billingSsn'}
                        props={{
                          placeholder: 'Billing SSN',
                          rounded: true,
                          borderless: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />
                    </Block>
                    <Block middle>
                      <Button round color="primary" style={styles.createButton} onPress={handleSubmit(onCheckout)}>
                        <Text bold size={14} color={theme.COLORS.WHITE}>
                          PROCEED WITH CHECKOUT
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.9,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    marginTop: 20,
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: theme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
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
    marginTop: 10
  },
  lottie: {
    height: 100,
    width: 100
  }
});

const mapStateToProps = state => ({
  subtotal: selectors.getCartSubtotal(state),
  coupon: selectors.getCoupon(state),
  isPostingOrder: selectors.getIsPostingOrder(state),
  isPostingInvoice: selectors.getIsPostingInvoice(state),
  isPostingPayment: selectors.getIsPostingPayment(state),
})

const mapDispatchToProps = dispatch => ({
  onCheckout(values) {
    if (!isEmpty(values)) {
      const { deliveryName, deliveryAddress, details, billingName, billingAddress, billingSsn } = values;
      console.log(values)
      if (
        deliveryName.length <= 0 ||
        deliveryAddress.length <= 0 ||
        billingName.length <= 0 ||
        billingAddress.length <= 0 ||
        billingSsn.length <= 0

      ) {
        alert('Please fill out the required fields.');
        return;
      }
      dispatch(actions.startpostingOrder({
        delivery_name: deliveryName,
        delivery_address: deliveryAddress,
        details: details,
        status: 0
      },
        {
          billing_name: billingName,
          billing_address: billingAddress,
          billing_ssn: billingSsn
        })
      );
    }
  },
})

const validate = values => {
  const errors = {}
  if (!values.deliveryName) {
    errors.deliveryName = 'Required'
  }

  if (!values.deliveryAddress) {
    errors.deliveryAddress = 'Required'
  }

  if (!values.billingName) {
    errors.billingName = 'Required'
  }

  if (!values.billingAddress) {
    errors.billingAddress = 'Required'
  }

  if (!values.billingSsn) {
    errors.billingSsn = 'Required'
  }

  return errors
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: 'checkout', validate })(Checkout)
);
