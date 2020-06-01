import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const ProductPreview = ({ item }) => {

  const { content } = item
  
	return (
    <View style={[styles.card, {borderColor: "#000000"}]} >
      <View style={styles.cardContent}>
        <Image style={[styles.image, styles.imageContent]}  source={{ uri: "https://i.ya-webdesign.com/images/avatar-png-5.png" }} />
        <Text style={styles.name}>User X</Text>
      </View>
      <View style={[styles.cardContent, styles.tagsContent]}>
        <Text>{content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height:null,
    paddingTop:10,
    paddingBottom:10,
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
})

export default ProductPreview;