import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import { theme, Input } from '../../components/UIComponents';

import ProductPreview from '../../components/ProductPreview';
import AnimatedLoader from 'react-native-animated-loader';

import * as actions from '../../redux/search/search.actions';
import * as selectors from '../../redux/root-reducer';

import { AppStyles } from '../../AppStyles';

const Search = ({ isSearching, dataList, navigation, route, searchProduct }) => {

  const [searchQuery, changeSearchQuery] = useState('');

  const changeQueryField = (query) => {
    console.log(query)
    changeSearchQuery(query)
    searchProduct(query)
  }

  const navigateToProductDetail = (item) => {
    console.log('Stating to navigate to ProductDetail...')
    navigation.navigate('ProductDetail', {
      name: item.name,
      item: item
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Input
          placeholder="Search a product..."
          left
          rounded
          icon="search"
          family="fontawesome5"
          iconSize={25}
          iconColor={theme.COLORS.INFO}
          value={searchQuery}
          onChangeText={(text) => changeQueryField(text)}
      />
      </View>
      <View>
        {
          isSearching && (
            <View style={styles.isSearchingContainer}>
              <ActivityIndicator size="large" color={theme.COLORS.INFO}/>
            </View>
          )
        }

        {
           !(searchQuery.length > 0) && !isSearching && (
            <View style={styles.isSearchingContainer}>
              <Text>Your new awesome purchase is waiting...</Text>
            </View>
          )
        }

        {
          (searchQuery.length > 0 && !isSearching) && (
            <>
            <ScrollView>
              {dataList && dataList.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8} 
                  style={styles.item} 
                  onPress={() => navigateToProductDetail(item)}>
                  <ProductPreview
                    item={item} 
                  />
                </TouchableOpacity>
                
              ))}
            </ScrollView>
            </>
          )
        }
      </View>


    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    margin: 6,
    borderRadius: 15,
    borderColor: AppStyles.color.gray,
    borderWidth: 1,
  },
  inputContainer: {
    marginTop: 6,
  },
  isSearchingContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    height: "100%"
  },
  inputs: {
    height: 50,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  lottie: {
    width: 100,
    height: 100,
  }
});

export default connect(
  state => ({
    isSearching: selectors.getIsSearching(state),
    dataList: selectors.getFilteredProducts(state)
  }),
  dispatch => ({
    searchProduct(query) {
      dispatch(actions.startSearchingProducts(query))
    }
  })
)(Search);