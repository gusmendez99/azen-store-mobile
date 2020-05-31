import React, { useEffect } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import PaymentItemPreview from "../../components/PaymentItemPreview/index";
import { AppStyles } from '../../AppStyles';
import * as actions from '../../redux/payment/payment.actions';
import * as selectors from '../../redux/root-reducer';

const COLUMNS_COUNT = 1;

const Payments = ({ 
  fetchPaymentItems, 
  isFetching, 
  dataList, 
  navigation }) => {
  
  useEffect(() => {
    fetchPaymentItems(); 
  }, []);

  // const navigateToProduct = (item) => {
  //   console.log('Stating to navigate to Product...')
  //   navigation.navigate('Products', {
  //     title: item.name,
  //     idCategory: item.id
  //   })
  // }
  console.log(dataList)
  return (
    <LinearGradient colors={[AppStyles.color.primaryGradientStart, AppStyles.color.primaryGradientEnd]} style={styles.container}>
      {isFetching ? (
        <Text style={styles.isFetchingText}>Retrieving data...</Text>
      ) : (
          <FlatList
            data={dataList}
            renderItem={({ item }) => {
              return (
                // <TouchableOpacity
                //   activeOpacity={0.8} style={styles.item} 
                  /* onPress={() => navigateToProduct(item)} */
                //   >

                  <PaymentItemPreview item={item} />
                //</TouchableOpacity>
              )
              }
            }
            keyExtractor={(item, index) => index.toString()}
            numColumns={COLUMNS_COUNT}
          >
          </FlatList>
        )}
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  isFetchingText: {
    color: AppStyles.color.white,
    fontSize: AppStyles.fontSize.content,
    alignSelf: "center"
  },
  item: {
    backgroundColor: AppStyles.color.white,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 6,
    marginTop: 6,
    borderRadius: 15
  },
})

export default connect(
  state => ({
    isFetching: selectors.getIsFetchingPaymentItems(state),
    dataList: selectors.getPaymentItems(state),
  }),
  dispatch => ({
    fetchPaymentItems(){
      dispatch(actions.startFetchingPaymentItems())
    }
  })

)(Payments);