import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { Block } from '../../components/UIComponents'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppStyles, AppIcon } from '../../AppStyles';

const Category = ({ item, index }) => {
  return (
    <Block card={true} center={true} style={styles.item}>
      <View style={styles.icon}>
        <FontAwesome5 name={item.icon} color={AppStyles.color.primary} size={25} />
      </View>
      <Text
        style={styles.titleText}>{item.name}</Text>
      <Text
        style={styles.descriptionText}>{item.description}</Text>
    </Block>
    
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 0,
  },
  titleText: {
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.black,
    textAlign: "center",
    marginBottom: 16
  },
  descriptionText: {
    fontSize: AppStyles.fontSize.normal,
    color: AppStyles.color.gray,
    fontWeight: "100",
    marginBottom: 16
  },
  icon: {
    paddingTop: 16,
    paddingBottom: 16
  }
})

export default Category;
