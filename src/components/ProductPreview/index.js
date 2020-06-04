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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { theme, Button } from '../../components/UIComponents';
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
              <FontAwesome5 name="shopping-cart" size={theme.SIZES.BASE} style={styles.socialBarIcon} color="white" />
							<Text style={styles.label} >Add to Cart</Text>
						</TouchableOpacity>
            <TouchableOpacity style={styles.socialBarButton} onPress={() => addToWishlist()}>
            <FontAwesome5 name="heart" size={theme.SIZES.BASE} style={styles.socialBarIcon} color="white" />
							<Text style={styles.label} >Add to WishList</Text>
						</TouchableOpacity>
					</View>
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
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: theme.SIZES.BASE / 2,
    backgroundColor:"white",
    marginHorizontal: theme.SIZES.BASE / 3,
  },
  cardFooter:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  /******** card components **************/
  title:{
    fontSize: theme.SIZES.FONT,
    flex:1,
  },
  price:{
    fontSize:16,
    color: theme.COLORS.FACEBOOK,
    marginTop: 5
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
    margin: theme.SIZES.BASE
  },
  socialBarButton:{
    padding: theme.SIZES.BASE,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: "#6984ff",
  },
  label: {
    fontSize: theme.SIZES.BASE,
    color: theme.COLORS.WHITE
  },
  socialBarIcon: {
    marginRight: 20,
  }
  
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