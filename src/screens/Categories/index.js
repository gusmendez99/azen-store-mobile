import React, { Component, useEffect } from "react";
import { StyleSheet, Text ,View, ScrollView, FlatList, StatusBar} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import Category from "../../components/Category/index";
import {AppStyles} from '../../AppStyles';
import * as actions from '../../redux/categories/categories.actions';
import * as selectors from '../../redux/root-reducer';

const numColumns =2;
const Categories = ({fetchCategories, isFetching, dataList})  => {
  useEffect(() => fetchCategories(), []);

  return(
    <LinearGradient colors={[AppStyles.color.primaryGradientStart, AppStyles.color.primaryGradientEnd]} style={styles.container}>
      {isFetching ? (
        <Text style={styles.isFetchingText}>Retrieving data...</Text>
      ):(
        <FlatList 
          data={dataList}
          renderItem={Category}
          keyExtractor={(item,index) => index.toString()}
          numColumns = {numColumns}
        >
        </FlatList>
      )}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    isFetchingText: {
      color: AppStyles.color.white,
      fontSize: AppStyles.fontSize.content,
      alignSelf: "center"
    }
})
export default connect(
  state => ({
    isFetching: selectors.getIsFetchingCategories(state),
    dataList: selectors.getCategories(state)
  }),
  dispatch =>({
    fetchCategories(){
      dispatch(actions.startFetchingCategories())
    }
  })
  )(Categories);
