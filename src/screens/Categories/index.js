import React, { useEffect } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import { connect } from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';

import Category from "../../components/Category/index";
import { AppStyles } from '../../AppStyles';
import * as actions from '../../redux/categories/categories.actions';
import * as cartActions from '../../redux/cart/cart.actions';
import * as wishlistActions from '../../redux/wishlist/wishlist.actions';
import * as selectors from '../../redux/root-reducer';

const COLUMNS_COUNT = 2;

const Categories = ({ 
  fetchCategories, 
  isFetching, 
  dataList, 
  authUserId, 
  getCartItems, 
  fetchCartItems,
  fetchWishlist,
  getCart,
  fetchCart,
  navigation }) => {
  
  useEffect(() => {
    fetchCategories(); 
  }, []);
  useEffect(() => {
    getCartItems();
  }, [authUserId]);
  useEffect(() => {
    getCart();
  }, [authUserId]);
  useEffect(() => {
    fetchWishlist();
  }, [])
  const navigateToProduct = (item) => {
    navigation.navigate('Products', {
      title: item.name,
      idCategory: item.id
    })
  }
  return (
    <View style={styles.container}>
      {isFetching ? (
        <AnimatedLoader visible={true} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} source={require( '../../assets/loader/loader.json')} speed={1} />
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: AppStyles.color.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 6,
    padding: 4,
    borderRadius: 15,
    borderColor: AppStyles.color.gray,
    borderWidth: 1
  },
  lottie: { 
    width: 100, 
    height: 100
  }
})
export default connect(
  state => ({
    isFetching: selectors.getIsFetchingCategories(state),
    dataList: selectors.getCategories(state),
    authUserId: selectors.getAuthUserID(state),
  }),
  dispatch => ({
    fetchCategories() {
      dispatch(actions.startFetchingCategories())
    },
    fetchCartItems(){
      dispatch(cartActions.startFetchingCartItems())
    },
    fetchCart(){
      dispatch(cartActions.startFetchingCart())
    },
    fetchWishlist(){
      dispatch(wishlistActions.startFetchingWishlist())
    }
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    getCartItems(){
      if(stateProps.authUserId !== null){
        dispatchProps.fetchCartItems()
      }
    },
    getCart(){
      if(stateProps.authUserId !== null){
        dispatchProps.fetchCart()
      }
    },

  })
)(Categories);
