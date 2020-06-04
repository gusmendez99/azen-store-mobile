import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import uuid from 'react-native-uuid';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { theme, Button, Block, Text } from '../../components/UIComponents';
import * as actions from '../../redux/cart/cart.actions';
import * as wishlistActions from '../../redux/wishlist/wishlist.actions';
import * as selectors from '../../redux/root-reducer';
import { AppStyles } from '../../AppStyles';

const HOST_BASE_URL = "https://azenstore.herokuapp.com"

const ProductPreview = ({ item, horizontal, cartItem, cartId, addCartItem, updateCartItem, addWishlistItem, wishlistProducts }) => {

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
    
    const imageStyles = [
      styles.horizontalImage
    ];
    const cardContainer = [styles.card, styles.shadow];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
          <Block flex style={imgContainer}>
            <Image source={{uri: imageUri}} style={imageStyles} />
          </Block>
          <Block flex space="between" style={styles.cardDescription}>
            <Text style={styles.title} p>{item.name}</Text>
            <Text style={styles.price}>Q{item.price}</Text>
            <View style={styles.socialBarContainer}>

            <Button onlyIcon icon="shopping-cart" iconFamily="materialicons" iconSize={28} color="primary" iconColor="#fff" style={ styles.actionCicleButton }></Button>
            <Button onlyIcon icon="favorite" iconFamily="materialicons" iconSize={28} color="red" iconColor="#fff" style={ styles.actionCicleButton }></Button>
            
            </View>
          </Block>
      </Block>
    );

	/* return (
		<View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>Q{item.price}</Text>
        <Image style={styles.cardImage} style={{width: 160, height: 160}} resizeMode={'cover'} source={{ uri: imageUri }} />
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
	) */
}

const styles = StyleSheet.create({
  /* cardLeft: {
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
    borderRadius: 24,
    marginVertical: theme.SIZES.BASE / 2,
    backgroundColor:"white",
    marginHorizontal: theme.SIZES.BASE / 3,
  },
  cardFooter:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },*/
  title: {
    fontWeight: "700",
  },
  price:{
    fontSize:16,
    color: theme.COLORS.PRIMARY,
    marginTop: 5,
  }, 
  socialBarContainer: {
    flex: 1,
    justifyContent: "flex-start",
    justifyContent: 'flex-start',
    alignItems: "center",
    flexDirection: 'row',
  },
  
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 0
  },
  cardTitle:{
    fontSize: theme.SIZES.FONT,
    flex:1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: (theme.SIZES.BASE / 2)
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 3,
  },
  horizontalImage: {
    height: 180,
    width: 'auto',
    padding: 2
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  actionCicleButton: { 
    width: 40, 
    height: 40,
    marginHorizontal: 5
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