import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList
} from 'react-native';
import uuid from 'react-native-uuid';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import Carousel from 'react-native-snap-carousel';
import ReviewPreview from '../../components/ReviewPreview';

import * as actions from '../../redux/cart/cart.actions';
import * as wishlistActions from '../../redux/wishlist/wishlist.actions';
import * as reviewActions from '../../redux/review/review.actions'
import * as selectors from '../../redux/root-reducer';

const HOST_BASE_URL = "https://azenstore.herokuapp.com"

const ProductDetail = ({ navigation, route, cartItem, cartId, reviews, stars, wishlistProducts, addCartItem, updateCartItem, addWishlistItem, getReviews }) => {
  const { item } = route.params;

  useEffect(getReviews, [])

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
          <ScrollView nestedScrollEnabled={true}  style={styles.container}>
            <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
              <Image style={styles.productImg} source={{ uri: `${HOST_BASE_URL}${item.featured_image}` }} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Q{item.price}</Text>
              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
            <View style={styles.starContainer}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={stars}
                fullStarColor={'gold'}
              />
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
            <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
              <Text style={styles.reviewTitle}>Reviews: {reviews.length}</Text>
                <Carousel
                  data={reviews}
                  renderItem={ReviewPreview}
                  sliderWidth={360}
                  itemWidth={256}
                  layout={'default'}
                />

              {/*<FlatList 
                style={styles.reviewsList}
                data={reviews}
                keyExtractor= {(item) => {
                  return item.id.toString();
                }}
              renderItem={ReviewPreview}/>*/}
            </View>
              
          </ScrollView>
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
  reviewTitle: {
    fontSize: 20,
    color: "#696969",
    fontWeight: 'bold',
    margin: 20
  },
  reviewsList:{
    marginTop:20,
    padding:10,
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
    reviews: selectors.getReviews(state),
    stars: selectors.getReviewsStars(state)
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
    getReviews() {
      dispatch(reviewActions.startFetchingReviews(route.params.item.id))
    }
  }),
)(ProductDetail);