import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { AppStyles, AppIcon } from '../../AppStyles';

const InvoiceItemPreview = ({ item, index }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.item}>
      <View style={styles.singleRow}>
        <Text
          style={styles.titleText}>{"Invoice number: "}</Text>
        <Text
          style={styles.descriptionText}>{item.id}</Text>
      </View>
      <View style={styles.singleRow}>
        <Text
          style={styles.titleText}>{"Order reference number: "}</Text>
        <Text
          style={styles.descriptionText}>{item.order}</Text>
      </View>
      <View style={styles.singleRow}>
        <Text
          style={styles.titleText}>{"Billing Name: "}</Text>
        <Text
          style={styles.descriptionText}>{item.billing_name}</Text>
      </View>
      <View style={styles.singleRow}>
        <Text
          style={styles.titleText}>{"Billing Address: "}</Text>
        <Text
          style={styles.descriptionText}>{item.billing_address}</Text>
      </View>
      <View style={styles.singleRow}>
        <Text
          style={styles.titleText}>{"Billing SSN: "}</Text>
        <Text
          style={styles.descriptionText}>{item.billing_ssn}</Text>
      </View>
      <View style={styles.singleRow}>
        <Text
          style={styles.titleText}>{"Invoice date: "}</Text>
        <Text
          style={styles.descriptionText}>{moment(item.invoice_datetime).format("DD MM YYYY hh:mm:ss")}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: AppStyles.color.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 6,
    marginTop: 6,
    borderRadius: 15
  },
  singleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#0000',
    backgroundColor: AppStyles.color.white,
    marginHorizontal: 6,
    marginVertical: 6,
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: AppStyles.fontSize.normal,
    color: AppStyles.color.black
  },
  descriptionText: {
    fontSize: AppStyles.fontSize.normal,
    color: AppStyles.color.darkGray,
    fontWeight: "100",
    marginBottom: 4
  },
  icon: {
    paddingTop: 16,
    paddingBottom: 16
  }
})

export default InvoiceItemPreview;
