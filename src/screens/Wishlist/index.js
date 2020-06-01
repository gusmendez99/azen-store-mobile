import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedLoader from 'react-native-animated-loader';
import {connect} from 'react-redux'

import * as selectors from '../../redux/root-reducer';
import WishlistItemPreview from '../../components/WishlistItemPreview/index';
import * as actions from '../../redux/wishlist/wishlist.actions';

const Wishlist = ({wishlist, navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <ScrollView>
        {wishlist && wishlist.products.map((product, i) => (
          <WishlistItemPreview
            key={i}
            productId={product} />
        ))}
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#f3f3f3',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginRight: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    justifyContent: 'center'

  },
  lottie: { 
    width: 100, 
    height: 100, 
  }
})

const mapStateToProps = state => ({
  wishlist: selectors.getWishlist(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  undefined,
)(Wishlist);