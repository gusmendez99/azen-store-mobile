import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import uuid from 'react-native-uuid';
import { connect } from 'react-redux';

import * as actions from '../../redux/cart/cart.actions';
import * as wishlistActions from '../../redux/wishlist/wishlist.actions';
import * as galleryItemsActions from '../../redux/galleryitems/galleryitems.actions';
import * as selectors from '../../redux/root-reducer';
const HOST_BASE_URL = "https://azenstore.herokuapp.com"

const ProductDetail = ({ navigation, route, cartItem, cartId, addCartItem, updateCartItem, addWishlistItem, wishlistProducts, fetchGalleryItems }) => {
  const { item } = route.params;
  useEffect( () => {
    fetchGalleryItems()
  }, [])
  const addToCart = () => {
    if(cartItem){
      updateCartItem({...cartItem, quantity: cartItem.quantity+1});
    } else {
      const newCartItem = {
        cart: cartId,
        product: item.id,
        quantity: 1
      };
      console.log(newCartItem)
      addCartItem(newCartItem);
    }
  }
  const addToWishlist = () => {
    if( wishlistProducts.includes(item.id) === false){
      addWishlistItem()
    } else {
      Alert.alert(
        'This item already exists in your wishlist!',
        '',
        [
          {text: 'Cancel', onPress: () => console.log('Got it'), style: 'cancel'},
        ],
        { cancelable: false }
      );
      
    }
  }

  return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
            <Image style={styles.productImg} source={{ uri: `${HOST_BASE_URL}${item.featured_image}` }} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Q{item.price}</Text>
            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>
          <View style={styles.starContainer}>
            <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
            <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
            <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
            <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
            <Image style={styles.star} source={{ uri: "https://img.icons8.com/color/40/000000/star.png" }} />
          </View>          
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={() => addToCart()}>
              <Text style={styles.shareButtonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={() => addToWishlist()}>
              <Text style={styles.shareButtonText}>Add To Wishlist</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    height: 200,
    width: 200
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: 'bold'
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: "#696969",
  },
  star: {
    width: 40,
    height: 40,
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30
  }
}); 

export default connect(
  (state, {route}) => ({
    cartItem: selectors.getCartItemByProductId(state,route.params.item.id),
    cartId: selectors.getCart(state).id,
    wishlistProducts: selectors.getWishlist(state).products,
  }),
  (dispatch, {route}) => ({
    updateCartItem(cartItem){
      dispatch(actions.startUpdatingCartItem(cartItem))
    },
    addCartItem(newCartItem){
      dispatch(
        actions.startAddingCartItem({
          id: uuid.v4(),
          ...newCartItem
        })
      );
    },
    addWishlistItem(){
      dispatch(wishlistActions.startAddingWishlistItem(route.params.item.id))
    },
    fetchGalleryItems(){
      dispatch(galleryItemsActions.startFetchingGalleryItems(route.params.item.id));
    },
  }),
)(ProductDetail);