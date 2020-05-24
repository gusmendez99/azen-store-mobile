import React, { useEffect } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import Category from "../../components/Category/index";
import { AppStyles } from '../../AppStyles';
import * as actions from '../../redux/categories/categories.actions';
import * as selectors from '../../redux/root-reducer';

const COLUMNS_COUNT = 2;

const Categories = ({ fetchCategories, isFetching, dataList, navigation }) => {
  useEffect(() => fetchCategories(), []);

  const navigateToProduct = (item) => {
    console.log('Stating to navigate...')
    navigation.navigate('Products', {
      title: item.name,
      idCategory: item.id
    })
  }

  return (
    <LinearGradient colors={[AppStyles.color.primaryGradientStart, AppStyles.color.primaryGradientEnd]} style={styles.container}>
      {isFetching ? (
        <Text style={styles.isFetchingText}>Retrieving data...</Text>
      ) : (
          <FlatList
            data={dataList}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8} style={styles.item} onPress={() => navigateToProduct(item)}>

                  <Category item={item} />
                </TouchableOpacity>
              )
              }
            }
            keyExtractor={(item, index) => index.toString()}
            numColumns={COLUMNS_COUNT}
          >
          </FlatList>
        )}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  isFetchingText: {
    color: AppStyles.color.white,
    fontSize: AppStyles.fontSize.content,
    alignSelf: "center"
  },
  item: {
    backgroundColor: AppStyles.color.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    flex: 1,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 6,
    marginTop: 6,
    borderRadius: 15
  },
})
export default connect(
  state => ({
    isFetching: selectors.getIsFetchingCategories(state),
    dataList: selectors.getCategories(state)
  }),
  dispatch => ({
    fetchCategories() {
      dispatch(actions.startFetchingCategories())
    }
  })
)(Categories);
