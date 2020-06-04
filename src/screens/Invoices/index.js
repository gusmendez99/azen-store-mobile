import React, { useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';


import InvoiceItemPreview from "../../components/InvoiceItemPreview/index";
import { AppStyles } from '../../AppStyles';
import * as actions from '../../redux/invoice/invoice.actions';
import * as selectors from '../../redux/root-reducer';

const COLUMNS_COUNT = 1;

const Invoices = ({ 
  fetchInvoiceItems, 
  isFetching, 
  dataList, 
  navigation }) => {
  
  useEffect(() => {
    fetchInvoiceItems(); 
  }, []);
  return (
    <View style={styles.container}>
      {isFetching ? (
        <AnimatedLoader visible={true} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} source={require('../../assets/loader/loader.json')} speed={1} />
      ) : (
          <FlatList
            data={dataList}
            renderItem={({ item }) => {
              return (
                  <InvoiceItemPreview item={item} />
              )
              }
            }
            keyExtractor={(item, index) => index.toString()}
            numColumns={COLUMNS_COUNT}
          >
          </FlatList>
        )}
    </View>
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
  lottie: {
    height: 100,
    width: 100
  }
})

export default connect(
  state => ({
    isFetching: selectors.getIsFetchingInvoiceItems(state),
    dataList: selectors.getInvoiceItems(state),
  }),
  dispatch => ({
    fetchInvoiceItems(){
      dispatch(actions.startFetchingInvoiceItems())
    }
  })

)(Invoices);