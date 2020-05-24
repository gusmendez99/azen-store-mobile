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
import { autofill } from 'redux-form';

const HOST_BASE_URL = "https://azenstore.herokuapp.com"

const ProductDetail = ({ navigation, route }) => {

  const { item } = route.params;

  const addToCart = () => {
    Alert.alert("Success", "Product has beed added to cart")
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

export default ProductDetail;