import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as actions from '../../redux/products/products.actions';
import * as cartActions from '../../redux/cart/cart.actions';
import * as selectors from '../../redux/root-reducer';

const quantityHandler = (action, item, updateCartItem) => {
  if(action === 'more'){
    updateCartItem({...item, quantity: item.quantity+1});
  } else if(action === 'less'){
    updateCartItem({...item, quantity: item.quantity > 1 ? item.quantity -1 : 1 });
  }
}
const deleteHandler = (removeCartItem) => {
  Alert.alert(
    'Are you sure you want to delete this item from your cart?',
    '',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Delete', onPress: () => {
        removeCartItem()
      }},
    ],
    { cancelable: false }
  );
}
const CartItemPreview = ({item, product, onProductFetch, updateCartItem, removeCartItem }) => {
  useEffect(() => {onProductFetch()}, []);
  return(
    product ? (
    <View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
    <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
      <TouchableOpacity onPress={() => console.log('image')} style={{paddingRight: 10}}>
        <Image source={{ uri: `${product.featured_image}` }} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
      </TouchableOpacity>
      <View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
        <Text numberOfLines={1} style={{fontSize: 15}}>{product.name}</Text>
        <Text numberOfLines={1} style={{color: '#8f8f8f'}}>{product.description}</Text>
        <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>Q{product.price * item.quantity}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => quantityHandler('less', item, updateCartItem)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
            <MaterialIcons name={"remove"} size={22} color={"#cccccc"} />
          </TouchableOpacity>
          <Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => quantityHandler('more', item, updateCartItem)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
          <MaterialIcons name={"add"} size={22} color={"#cccccc"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <View style={[styles.centerElement, {width: 60}]}>
      <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => deleteHandler(removeCartItem)}>
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
  centerElement: {
    justifyContent: 'center', 
    alignItems: 'center'},
});

export default connect(
  (state, {item}) => ({
    product: selectors.getProduct(state, item.product)
  }),
  (dispatch, {item}) => ({
    onProductFetch(){
      dispatch(actions.startFetchingSingleProduct(item.product))
    },
    updateCartItem(cartItem){
      dispatch(cartActions.startUpdatingCartItem(cartItem))
    },
    removeCartItem(){
      dispatch(cartActions.startRemovingCartItem(item.id))
    }
  })

)(CartItemPreview);