import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import ProductPreview from '../../components/ProductPreview';
import LinearGradient from 'react-native-linear-gradient';

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
    <LinearGradient colors={[AppStyles.color.primaryGradientStart, AppStyles.color.primaryGradientEnd]} style={styles.container}>
      {isFetching ? (
        <Text style={styles.isFetchingText}>Retrieving data...</Text>
      ) : (
        <>
        

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
              }
            }/>
            </>
        )}

    </LinearGradient>
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