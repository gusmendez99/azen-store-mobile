import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AppStyles, AppIcon} from '../../AppStyles';



const {width} = Dimensions.get('window');

const Category=({item, index}) => {
  let iconName = '';
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style = {styles.item}
      // onPress={() =>
      //   this.props.navigation.navigate('Category', {
      //     name: titleFirst,
      //   })
      // }
      > 
        <View style={styles.icon}>
        <FontAwesome5 name={item.icon} color={AppStyles.color.tint} size={25}/>
        </View>
        <Text
        style={styles.titleText}>{item.name}</Text>
        <Text
        style={styles.descriptionText}>{item.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: AppStyles.color.white,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 100,
    flex: 1,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 6,
    marginTop: 6,
    borderRadius: 15
  },
  titleText: {
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.black,
    marginBottom: 16
  },
  descriptionText: {
    fontSize: AppStyles.fontSize.normal,
    color: AppStyles.color.darkGray,
    fontWeight: "100",
    marginBottom: 16
  },
  icon: {
    paddingTop: 16,
    paddingBottom: 16
  }
})

export default Category;
