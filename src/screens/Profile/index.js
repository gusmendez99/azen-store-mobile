import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Field, reduxForm } from 'redux-form';

import AnimatedLoader from 'react-native-animated-loader';

import * as selectors from '../../redux/root-reducer';
import * as userActions from '../../redux/user/user.actions';
import * as authActions from '../../redux/auth/auth.actions';

import { AppStyles } from '../../AppStyles';

const renderInput = ({ input: { onChange, ...input }, ...rest }) => {
  return (
    <TextInput
      style={styles.body}
      onChangeText={onChange}
      {...input}
      {...rest}
    />
  );
};


const Profile = ({ authUserId, userProfile, fetchUser, logout, onSubmit, handleSubmit, navigation, isUpdatingUser, isFetchingUser, error }) => {
  useEffect(() => {
    fetchUser();
  }, [authUserId]);

  const navigateToChangePassword = () => {
    console.log('Stating to navigate to ChangePassword...')
    navigation.navigate('ChangePassword')
  }
  const { username } = userProfile;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={{ uri: 'https://i.ya-webdesign.com/images/avatar-png-5.png' }} />
            <Text style={styles.name}>
              {username}
            </Text>
          </View>
        </View>

        <View style={styles.profileDetail}>
          <TouchableOpacity style={styles.detailContent} onPress={() => {navigation.navigate('Orders')}}>
            <Text style={styles.title}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailContent} onPress={() => {navigation.navigate('Invoices')}} >
            <Text style={styles.title}>My Invoices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailContent} onPress={()=> navigation.navigate('Payments')}>
            <Text style={styles.title}>My Payments</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>

            {
              userProfile && (
                <>
                  <View style={styles.InputContainer}>
                    <Field
                      name={'username'}
                      props={{
                        placeholder: 'Enter username...',
                        placeholderTextColor: AppStyles.color.grey,
                        underlineColorAndroid: 'transparent',
                      }}
                      component={renderInput}
                    />
                  </View>
                  <View style={styles.InputContainer}>
                    <Field
                      name={'email'}
                      props={{
                        placeholder: 'Enter email...',
                        placeholderTextColor: AppStyles.color.grey,
                        underlineColorAndroid: 'transparent',
                      }}
                      component={renderInput}
                    />
                  </View>
                  <View style={styles.InputContainer}>
                    <Field
                      name={'first_name'}
                      props={{
                        placeholder: 'Enter first name...',
                        placeholderTextColor: AppStyles.color.grey,
                        underlineColorAndroid: 'transparent',
                      }}
                      component={renderInput}
                    />
                  </View>
                  <View style={styles.InputContainer}>
                    <Field
                      name={'last_name'}
                      props={{
                        placeholder: 'Enter last name...',
                        placeholderTextColor: AppStyles.color.grey,
                        underlineColorAndroid: 'transparent',
                      }}
                      component={renderInput}
                    />
                  </View>
                </>
              )
            }

            <TouchableOpacity onPress={() => navigateToChangePassword()} style={styles.buttonContainer}>
              <Text>Change password</Text>
            </TouchableOpacity>

            {
              isUpdatingUser ? (
                <AnimatedLoader visible={true} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} speed={1} />
              ) : (
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.buttonContainer}>
                <Text>Save</Text>
              </TouchableOpacity>
                )
            }

            {
              error && (
                <Text style={styles.name}>
                  {error}
                </Text>
              )
            }

            
            <TouchableOpacity onPress={() => logout()} style={styles.buttonContainer}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2196f3",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
    marginBottom: 16
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 200,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent: {
    margin: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: "#2196f3"
  },
  count: {
    fontSize: 18,
  },
  body: {
    paddingLeft: 2,
    paddingRight: 2,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 6,
    marginTop: 60,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: AppStyles.buttonWidth.main,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#2196f3",
  },
  description: {
    fontSize: 20,
    color: "#2196f3",
    marginTop: 10,
    textAlign: 'center'
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
    paddingHorizontal: 10
  },
  lottie: { 
    width: 100, 
    height: 100, 
  }
});

const mapStateToProps = state => ({
  authUserId: selectors.getAuthUserID(state),
  userProfile: selectors.getUser(state),
  isFetchingUser: selectors.getIsFetchingUser(state),
  isUpdatingUser: selectors.getIsUpdatingUser(state),
  error: selectors.getIsFetchingUser(state),
  initialValues: selectors.getUser(state)
})

const mapDispatchToProps = dispatch => ({
  fetchUserData() {
    dispatch(userActions.startFetchingUser())
  },
  onSubmit(values) {
    const { username, first_name, last_name, email } = values;
    console.log('Updating: ' + username);
    if (username.length <= 0) {
      alert('Please fill out the required fields.');
      return;
    }
    dispatch(userActions.startUpdatingUser({ username, first_name, last_name }));
  },
  logout() {
    dispatch(authActions.logout())
  }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  fetchUser() {
    if (stateProps.authUserId !== null) {
      dispatchProps.fetchUserData()
    }
  }

})

export default connect(
  mapStateToProps, 
  mapDispatchToProps, 
  mergeProps
)(
  reduxForm({ form: 'profile-form', enableReinitialize: true })(Profile)
);