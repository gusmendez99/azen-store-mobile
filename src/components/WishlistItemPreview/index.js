import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import React,{useEffect} from 'react'
import uuid from 'react-native-uuid';

import * as actions from '../../redux/products/products.actions';
import * as cartActions from '../../redux/cart/cart.actions';
import * as wishlistActions from '../../redux/wishlist/wishlist.actions';
import * as selectors from '../../redux/root-reducer';


const WishlistItemPreview = ({productId, product, onProductFetch, removeWishlistItem, cartItem, cartId, updateCartItem, addCartItem }) => {
  useEffect(() => {onProductFetch()}, []);
  
  const addToCart = () => {
    if(cartItem){
      updateCartItem({...cartItem, quantity: cartItem.quantity+1});
    } else {
      const newCartItem = {
        cart: cartId,
        product: productId,
        quantity: 1
      };
      addCartItem(newCartItem);
    }
  }


  const deleteHandler = () => {
    Alert.alert(
      'Are you sure you want to delete this item from your wishlist?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => {
          removeWishlistItem()
        }},
      ],
      { cancelable: false }
    );
  }
  
  return(
    product ? (
    <View style={styles.cartItemContainer}>
    <View style={styles.cartItemSecondaryContainer}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={{ uri: `${product.featured_image}` }} style={[styles.centerElement, styles.image]} />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text numberOfLines={1} style={styles.nameText}>{product.name}</Text>
        <Text numberOfLines={1} style={styles.descriptionText}>{product.description}</Text>
        <Text numberOfLines={1} style={styles.itemTotalText}>Q{product.price}</Text>
      </View>
    </View>
    <View style={[styles.centerElement, styles.removeCartItemContainer]}>
      <TouchableOpacity style={[styles.centerElement,styles.removeCartItemSecondaryContainer ]} onPress={() => addToCart()}>
        <Ionicons name="md-cart" size={25} color="#008CBA" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.centerElement,styles.removeCartItemSecondaryContainer ]} onPress={() => deleteHandler()}>
        <Ionicons name="md-trash" size={25} color="#ee4d2d" />
      </TouchableOpacity>
    </View>
  </View>
    ):(
      <TouchableOpacity></TouchableOpacity>
    )
  );
};
const styles = StyleSheet.create({
  cartItemContainer: {flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120},
  cartItemSecondaryContainer: {flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'},
  imageContainer: {paddingRight: 10},
  image: {height: 60, width: 60, backgroundColor: '#eeeeee'},
  detailsContainer: {flexGrow: 1, flexShrink: 1, alignSelf: 'center'},
  nameText: {fontSize: 15},
  descriptionText: {color: '#8f8f8f'},
  itemTotalText: {color: '#333333', marginBottom: 10},
  quantityContainer: {flexDirection: 'row'},
  quantityButton: { borderWidth: 1, borderColor: '#cccccc' },
  quantityText: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 },
  removeCartItemContainer: {width: 60},
  removeCartItemSecondaryContainer:  {width: 32, height: 32}, 
  centerElement: {
    justifyContent: 'center', 
    alignItems: 'center'},
});

export default connect(
  (state, {productId}) => ({
    product: selectors.getProduct(state, productId),
    cartItem: selectors.getCartItemByProductId(state,productId),
    cartId: selectors.getCart(state).id,
  }),
  (dispatch, {productId}) => ({
    onProductFetch(){
      dispatch(actions.startFetchingSingleProduct(productId))
    },
    removeWishlistItem(){
      dispatch(wishlistActions.startRemovingWishlistItem(productId))
    },
    updateCartItem(cartItem){
      dispatch(cartActions.startUpdatingCartItem(cartItem))
    },
    addCartItem(newCartItem){
      dispatch(
        cartActions.startAddingCartItem({
          id: uuid.v4(),
          ...newCartItem
        })
      );
    },
  })

)(WishlistItemPreview);