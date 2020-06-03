import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import uuid from 'react-native-uuid';

import * as actions from '../../redux/cart/cart.actions';
import * as wishlistActions from '../../redux/wishlist/wishlist.actions';
import * as selectors from '../../redux/root-reducer';
import { AppStyles } from '../../AppStyles';
const HOST_BASE_URL = "https://azenstore.herokuapp.com"

const ProductPreview = ({ item, cartItem, cartId, addCartItem, updateCartItem, addWishlistItem, wishlistProducts }) => {

  const imageUri = item.featured_image.includes("azenstore.herokuapp.com") ? item.featured_image.replace("http", "https") : `${HOST_BASE_URL}${item.featured_image}`

  const addToCart = () => {
    if(cartItem){
      updateCartItem({...cartItem, quantity: cartItem.quantity+1});
    } else {
      const newCartItem = {
        cart: cartId,
        product: item.id,
        quantity: 1
      };
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
          {text: 'Got it', onPress: () => console.log('Got it'), style: 'cancel'},
        ],
        { cancelable: false }
      );
      
    }
  }
	return (
      //  <View style={
      //    { flex: 1,
      //       flexDirection: "row", 
      //       backgroundColor: '#fff', 
      //       marginBottom: 2, 
      //       height: 120
      //     }
      //  }>
      //    <Text>
      //     Hello
      //    </Text>
      //    <Text>
      //      Hello
      //    </Text>

      //  </View>
		<View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>Q{item.price}</Text>

        <Image style={styles.cardImage} style={{width: 200, height: 200}} resizeMode={'cover'} source={{ uri: imageUri }} />
      </View>    
			<View style={styles.cardFooter}>
				<View style={styles.socialBarContainer}>
					<View style={styles.socialBarSection}>
						<TouchableOpacity style={styles.socialBarButton} onPress={() => addToCart()}>
							<Image style={styles.icon} source={{ uri: 'https://www.shareicon.net/data/512x512/2016/09/10/828167_cart_512x512.png' }} />
							<Text style={[styles.socialBarLabel, styles.buyNow]} >Add to Cart</Text>
						</TouchableOpacity>
            <TouchableOpacity style={styles.socialBarButton} onPress={() => addToWishlist()}>
							<Image style={styles.icon} source={{ uri: 'https://www.shareicon.net/data/128x128/2016/07/11/598139_list_64x64.png' }} />
							<Text style={[styles.socialBarLabel, styles.buyNow]} >Add to WishList</Text>
						</TouchableOpacity>
					</View>
					{/* <View style={styles.socialBarSection}>
						<TouchableOpacity style={styles.socialBarButton}>
							<Image style={styles.icon} source={{ uri: 'https://www.shareicon.net/data/256x256/2015/08/19/87491_heart_512x512.png' }} />
							<Text style={styles.socialBarLabel}>25</Text>
						</TouchableOpacity>
					</View> */}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
  cardLeft: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
	card:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // shadowColor: '#00000021',
    // shadowOffset: {
    //   width: 2
    // },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white",
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    // paddingTop: 12.5,
    // paddingBottom: 25,
    // paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    // flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    // flex:1,
  },
  price:{
    fontSize:16,
    color: "green",
    marginTop: 5
  },
  buyNow:{
    color: "purple",
  },
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
  },
  socialBarSection: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: 'column',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "flex-end",
  },
  socialBarlabel: {
    marginLeft: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  
})

export default connect(
  (state, {item}) => ({
    cartItem: selectors.getCartItemByProductId(state,item.id),
    cartId: selectors.getCart(state).id,
    wishlistProducts: selectors.getWishlist(state).products,
  }),
  (dispatch, {item}) => ({
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
      dispatch(wishlistActions.startAddingWishlistItem(item.id))
    }
  }),

)(ProductPreview);