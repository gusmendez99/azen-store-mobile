import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import StarRating from 'react-native-star-rating';

const ProductPreview = ({ item }) => {

  const { content, username, rate } = item
  
	return (
    <View style={[styles.card, {borderColor: "#000000"}]} >
      <View style={styles.cardContent}>
        <Image style={[styles.image, styles.imageContent]}  source={{ uri: "https://i.ya-webdesign.com/images/avatar-png-5.png" }} />
        <Text style={styles.name}>{username}</Text>
      </View>
      <View >
        <View style={styles.starContainer}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={rate}
            starSize={18}
            fullStarColor={'gold'}
          />
        </View>
        <Text>{content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height:null,
    padding: 10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:40,
    marginBottom:20,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10, 
  },
  imageContent:{
    marginTop:-40,
  },
  tagsContent:{
    marginTop:10,
    flexWrap:'wrap'
  },
  image:{
    width:60,
    height:60,
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    marginLeft:10,
    alignSelf: 'center'
  },
  starContainer: {
    justifyContent: 'flex-start',
    marginHorizontal: 12,
    marginVertical: 12
  },
})

export default ProductPreview;