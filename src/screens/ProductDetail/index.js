import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Text, Input, Block, Button } from '../../components/UIComponents'; 
import uuid from 'react-native-uuid';
import { connect } from 'react-redux';
import { AppStyles } from '../../AppStyles';
import { SliderBox } from "react-native-image-slider-box";
import StarRating from 'react-native-star-rating';
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal';
import ReviewPreview from '../../components/ReviewPreview';

import * as actions from '../../redux/cart/cart.actions';
import * as wishlistActions from '../../redux/wishlist/wishlist.actions';
import * as reviewActions from '../../redux/review/review.actions'
import * as galleryItemsActions from '../../redux/galleryitems/galleryitems.actions';
import * as selectors from '../../redux/root-reducer';

const HOST_BASE_URL = "https://azenstore.herokuapp.com"

const ProductDetail = ({ navigation, route, authUsername, cartItem, cartId, reviews, stars, wishlistProducts, addCartItem, updateCartItem,
  addWishlistItem, getReviews, fetchGalleryItems, postReview, galleryItems, isFetchingGalleryItems }) => {
  const { item } = route.params;

  const [isModalVisible, changeModalVisible] = useState(false);
  const [newReviewContent, changeNewReviewContent] = useState('');
  const [newReviewRate, changeNewReviewRate] = useState(0);

  const toggleModal = () => {
    changeModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getReviews()
    fetchGalleryItems()
  }, [])

  const addToCart = () => {
    if (cartItem) {
      updateCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });
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
    if (wishlistProducts.includes(item.id) === false) {
      addWishlistItem()
    } else {
      Alert.alert(
        'This item already exists in your wishlist!',
        '',
        [
          { text: 'Cancel', onPress: () => console.log('Got it'), style: 'cancel' },
        ],
        { cancelable: false }
      );

    }
  }

  const addReview = () => {
    postReview({ content: newReviewContent, rate: newReviewRate, product: item.id })
    toggleModal()
  }

  const canPostNewReview = () => {
    if (reviews.length > 0) {
      // If current user has already posted a review...
      return !(reviews.find(review => review.username === authUsername));
    }
    return true;
  }
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <View style={{ alignItems: 'center', marginHorizontal: 30 }} >
        {isFetchingGalleryItems ? (
          <></>
        ) : (
            <View style={{ alignItems: 'center', height: 300 }}>
              <SliderBox
                sliderBoxHeight={280}
                resizeMethod={'resize'}
                resizeMode={'cover'}
                autoplay
                images={[`${HOST_BASE_URL}${item.featured_image}`,...galleryItems]}
                paginationBoxVerticalPadding={20}
                ImageComponentStyle={{height: '100%', width: '100%'}}
                dotColor="#2196f3"
                inactiveDotColor="#90A4AE"
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: "rgba(128, 128, 128, 0.92)"
                }}
              />

            </View>
          )
        }
        <Text style={styles.name} h4>{item.name}</Text>
        <Text style={styles.price} p>Q{item.price}</Text>
        <Text style={styles.description} muted>
          {item.description}
        </Text>
      </View>
      
      <View style={styles.separator}></View>
      <View style={styles.actionsContainer}>
        <Button onlyIcon icon="shopping-cart" iconFamily="materialicons" iconSize={30} color="primary" iconColor="#fff" style={ styles.actionCircleButton } onPress={() => addToCart()}></Button>
        <Button onlyIcon icon="favorite" iconFamily="materialicons" iconSize={30} color="red" iconColor="#fff" style={ styles.actionCircleButton } onPress={() => addToWishlist()}></Button>
        {
          canPostNewReview() && (
            <Button onlyIcon icon="star" iconFamily="materialicons" iconSize={30} color="warning" iconColor="#fff" style={ styles.actionCircleButton } onPress={() => toggleModal()}></Button>
          )
        }
        
      </View>
      <View style={styles.separator}></View>
      
      <View style={{ alignItems: 'center', marginHorizontal: 30, marginVertical: 10 }}>
        <Text p>Reviews({reviews.length})</Text>
        <View style={styles.starContainer}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={stars}
            fullStarColor={'gold'}
          />
        </View>
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
      {/* Modal to add a new review */}
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => changeModalVisible(false)}
        onBackdropPress={() => changeModalVisible(false)}
        backdropColor="white"
        style={{ alignContent: "center", justifyContent: 'center', flex: 1}}
        backdropOpacity={0.98}>
        <View style={[styles.container]}>

          <Text style={styles.modalTitle}>New Review</Text>
          <View style={styles.starContainer}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={newReviewRate}
              fullStarColor={'gold'}
              selectedStar={(rating) => changeNewReviewRate(rating)}
            />
          </View>
            <Input
              rounded
              placeholder="Write your review..."
              onChangeText={(text) => changeNewReviewContent(text)}
              value={newReviewContent} />
          <View style={styles.addToCarContainer}>
            <Button 
              rounded
              onPress={() => addReview()}>
              Post Review
            </Button>
          </View>
          <View style={styles.addToCarContainer}>
            <Button
              rounded 
              color="red"
              onPress={() => toggleModal()}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row', 
    padding: 20, 
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  actionCircleButton : {
    width: 50, 
    height: 50
  },
  name: {
    fontWeight: 'bold',
    margin: 10,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 28,
    color: AppStyles.color.black,
    fontWeight: 'bold'
  },
  reviewTitle: {
    fontSize: 20,
    color: "#696969",
    fontWeight: 'bold',
    margin: 10
  },
  reviewsList: {
    marginTop: 20,
    padding: 10,
  },
  price: {
    margin: 10,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    paddingHorizontal: 50,
    marginVertical: 20
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30
  },
  shareButton: {
    marginTop: 15,
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
    marginVertical: 10
  },
  InputContainer: {
    width: "100%",
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
});

export default connect(
  (state, { route }) => ({
    authUsername: selectors.getAuthUsername(state),
    cartItem: selectors.getCartItemByProductId(state, route.params.item.id),
    cartId: selectors.getCart(state).id,
    wishlistProducts: selectors.getWishlist(state).products,
    isFetchingGalleryItems: selectors.getisFetchingGalleryItems(state),
    galleryItems: selectors.getGalleryItems(state).map(galleryItem => galleryItem.image),
    reviews: selectors.getReviews(state),
    stars: selectors.getReviewsStars(state)
  }),
  (dispatch, { route }) => ({
    updateCartItem(cartItem) {
      dispatch(actions.startUpdatingCartItem(cartItem))
    },
    addCartItem(newCartItem) {
      dispatch(
        actions.startAddingCartItem({
          id: uuid.v4(),
          ...newCartItem
        })
      );
    },
    addWishlistItem() {
      dispatch(wishlistActions.startAddingWishlistItem(route.params.item.id))
    },
    getReviews() {
      dispatch(reviewActions.startFetchingReviews(route.params.item.id))
    },
    fetchGalleryItems() {
      dispatch(galleryItemsActions.startFetchingGalleryItems(route.params.item.id));
    },
    postReview(review) {
      dispatch(reviewActions.startPostingReview(review))
    }
  }),
)(ProductDetail);