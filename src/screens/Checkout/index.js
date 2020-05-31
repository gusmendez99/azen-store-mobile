import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import * as selectors from '../../redux/root-reducer';

import { AppStyles } from '../../AppStyles';

import * as actions from "../../redux/order/order.actions";

const renderInput = ({ input: { onChange, ...input }, ...rest }) => {
  return (
    <TextInput
      style={styles.body}
      onChangeText={onChange}
      {...input}
      {...rest}
    />
  );
};

const Checkout = ({ onCheckout, handleSubmit, subtotal, coupon }) => {

  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Text style={[styles.title, styles.centerTitle]}>Order Details</Text>
  <Text style={[styles.subtotal, styles.centerTitle]}>Total to pay: Q{
            coupon ? (
                subtotal - (subtotal * (parseFloat(coupon.discount) / 100))
            ) : (
              subtotal
            ) 
          }</Text>
      <View style={styles.InputContainer}>
        <Field
          name={'deliveryName'}
          props={{
            placeholder: 'Who do we send this products to? (perhaps your own name)',
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'deliveryAddress'}
          props={{
            placeholder: 'Where do we deliver this (NASA and CIA addresses not allowed..)?',
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'details'}
          props={{
            placeholder: 'Details.... Something else we have to know?',
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <Text style={[styles.title, styles.centerTitle]}>Invoice Details</Text>
      <View style={styles.InputContainer}>
        <Field
          name={'billingName'}
          props={{
            placeholder: 'Billing Name',
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'billingAddress'}
          props={{
            placeholder: 'Billing Address',
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'billingSsn'}
          props={{
            placeholder: 'Billing SSN',
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <Button
        containerStyle={[styles.loginContainer, { marginTop: 50 }]}
        style={styles.loginText}
        onPress={handleSubmit(onCheckout)}>
        Proceed with checkout
      </Button>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  centerTitle: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  subtotal: {
    fontSize: AppStyles.fontSize.normal,
    fontWeight: 'bold',
    color: AppStyles.color.black,
    marginBottom: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
});

const mapStateToProps = state => ({
  subtotal: selectors.getCartSubtotal(state),
  coupon: selectors.getCoupon(state),
})

const mapDispatchToProps = dispatch => ({
  onCheckout(values) {
    if (!isEmpty(values)) {
      const { deliveryName, deliveryAddress, details, billingName, billingAddress, billingSsn } = values;
      console.log(values)
      if (
        deliveryName.length <= 0 ||
        deliveryAddress.length <= 0 ||
        details.length <= 0 ||
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: 'checkout' })(Checkout)
);
