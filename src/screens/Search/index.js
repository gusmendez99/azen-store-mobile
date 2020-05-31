import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import ProductPreview from '../../components/ProductPreview';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedLoader from 'react-native-animated-loader';

import * as actions from '../../redux/search/search.actions';
import * as selectors from '../../redux/root-reducer';

import { AppStyles, AppIcon } from '../../AppStyles';

const COLUMNS_COUNT = 2;

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
        <MaterialIcons style={[styles.icon, styles.inputIcon]} name={"search"} size={26} color={"#2196f3"} />
        <TextInput style={styles.inputs}
          placeholder="Search a product..."
          value={searchQuery}
          onChangeText={(text) => changeQueryField(text)} />
      </View>
      <View>
        {
          isSearching && (
            <Text>{'Searching...'}</Text>
          )
        }

        {
           !(searchQuery.length > 0) && !isSearching && (
            <Text>{'No items found :('}</Text>
          )
        }

        {
          (searchQuery.length > 0 && !isSearching) && (
            <FlatList style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={dataList}
              horizontal={false}
              numColumns={COLUMNS_COUNT}
              keyExtractor={(item) => {
                return item.id;
              }}
              ItemSeparatorComponent={() => {
                return (
                  <View style={styles.separator} />
                )
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8} style={styles.item} onPress={() => navigateToProductDetail(item)}>

                    <ProductPreview item={item} />
                  </TouchableOpacity>
                )
              }}
            />
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
    backgroundColor: AppStyles.color.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 6,
    marginTop: 6,
    borderRadius: 15,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  separator: {
    marginTop: 10,
  },
  inputContainer: {
    borderBottomColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
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
  inputIcon: {
    justifyContent: 'center'

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