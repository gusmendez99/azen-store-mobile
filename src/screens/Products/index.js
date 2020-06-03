import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

import ProductPreview from '../../components/ProductPreview';

import * as actions from '../../redux/categories/categories.actions';
import * as selectors from '../../redux/root-reducer';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppStyles, AppIcon } from '../../AppStyles';

const COLUMNS_COUNT = 2;

const Products = ({ fetchCategoryProducts, isFetching, dataList, navigation, route }) => {

  const { idCategory } = route.params;

  useEffect(() => fetchCategoryProducts(idCategory), []);

  const navigateToProductDetail = (item) => {
    console.log('Stating to navigate to ProductDetail...')
    navigation.navigate('ProductDetail', {
      name: item.name,
      item: item
    })
  }

  return (
    <View style={styles.container}>
      {isFetching ? (
        <></>
      ) : (
        <>
          <ScrollView>
            {dataList && dataList.map((item, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.8} 
                style={styles.item} 
                onPress={() => navigateToProductDetail(item)}>
                
                <ProductPreview
                  item={item} />
              </TouchableOpacity>
              
            ))}
          </ScrollView>
          {/* <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={dataList}
            horizontal={false}
            keyExtractor={(item) => {
              return item.id;
            }}

            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8} style={styles.item} onPress={() => navigateToProductDetail(item)}>

                  <ProductPreview item={item} />
                </TouchableOpacity>
              )
              }
            }/> */}
            </>
        )}

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
});
export default connect(
  state => ({
    isFetching: selectors.getIsFetchingCategories(state),
    dataList: selectors.getCategoryProducts(state)
  }),
  dispatch => ({
    fetchCategoryProducts(idCategory) {
      dispatch(actions.startFetchingCategoryProducts(idCategory))
    }
  })
)(Products);