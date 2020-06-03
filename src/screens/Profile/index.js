import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ImageBackground,
  ScrollView
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Block, Text, Button, Input } from '../../components/UIComponents';

import AnimatedLoader from 'react-native-animated-loader';

import * as selectors from '../../redux/root-reducer';
import * as userActions from '../../redux/user/user.actions';
import * as authActions from '../../redux/auth/auth.actions';

import { AppStyles } from '../../AppStyles';

const renderInput = ({ input: { onChange, ...input }, ...rest }) => {
  return (
    <Input
      onChangeText={onChange}
      {...input}
      {...rest}
    />
  );
};


const Profile = ({ authUserId, userProfile, fetchUser, logout, onSubmit, handleSubmit, navigation, isUpdatingUser, isFetchingUser, error, ordersCount, invoicesCount, paymentsCount }) => {
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

      <Block flex >
        <ImageBackground
          source={{ uri: "https://raw.githubusercontent.com/creativetimofficial/argon-react-native/master/assets/imgs/profile-screen-bg.png" }}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >

          <Block flex style={styles.profileCard}>
            <Block middle style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://i.ya-webdesign.com/images/avatar-png-5.png" }}
                style={styles.avatar}
              />
            </Block>
            <Block style={styles.info}>
            <Block middle style={styles.nameInfo}>
                <Text bold size={28} color="#32325D">
                  {username}
                </Text>
              </Block>
              <Block row space="between" style={styles.stats}>
                <TouchableOpacity onPress={() => { navigation.navigate('Invoices') }}>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      {invoicesCount}
                      </Text>
                    <Text size={12} >Invoices</Text>
                  </Block>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Orders') }}>
                  <Block middle >
                    <Text
                      bold
                      size={18}
                      color="#525F7F"
                      style={{ marginBottom: 4 }}
                    >
                      {ordersCount}
                      </Text>
                    <Text size={12} >Orders</Text>
                  </Block>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Payments') }}>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      {paymentsCount}
                      </Text>
                    <Text size={12}  >Payments</Text>
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>
            <Block flex>
              
              <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <Block middle>

                {
                  userProfile && (
                    <>
                      <Field
                        name={'username'}
                        style={styles.input}
                        props={{
                          placeholder: 'Enter username...',
                          rounded: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />
                      <Field
                        name={'email'}
                        style={styles.input}
                        props={{
                          placeholder: 'Enter email...',
                          rounded: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />
                      <Field
                        name={'first_name'}
                        style={styles.input}
                        props={{
                          placeholder: 'Enter first name...',
                          rounded: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />

                      <Field
                        name={'last_name'}
                        style={styles.input}
                        props={{
                          placeholder: 'Enter last name...',
                          rounded: true,
                          underlineColorAndroid: 'transparent',
                        }}
                        component={renderInput}
                      />
                    </>
                  )
                }

                <View>
                  <Button
                    round
                    uppercase
                    size="small"
                    style={styles.button}
                    onPress={() => navigateToChangePassword()}>
                    Change password
                  </Button>
                  {
                    isUpdatingUser ? (
                      <AnimatedLoader visible={true} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} speed={1} />
                    ) : (
                        <Button
                          size="small"
                          round
                          uppercase
                          style={styles.button}
                          onPress={handleSubmit(onSubmit)}>
                          Save
                        </Button>
                      )
                  }
                  {
                    error && (
                      <Text p style={styles.name}>
                        {error}
                      </Text>
                    )
                  }
                  <Button
                    round
                    uppercase
                    size="small"
                    style={styles.button}
                    onPress={() => logout()}>
                    Logout
                  </Button>
                </View>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
  input: {
    marginVertical: 4,
  },
  button: {
    marginVertical: 8,
  },
  profile: {
    flex: 1
  },
  profileContainer: {
    width: "100%",
    height: "100%",
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: "100%",
    height: "50%"
  },
  profileCard: {
    // position: "relative",
    padding: 30,
    marginHorizontal: 30,
    marginTop: 65,
    marginBottom: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: AppStyles.color.white,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  stats: {
    marginTop: 20
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 20
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
});

const mapStateToProps = state => ({
  authUserId: selectors.getAuthUserID(state),
  userProfile: selectors.getUser(state),
  isFetchingUser: selectors.getIsFetchingUser(state),
  isUpdatingUser: selectors.getIsUpdatingUser(state),
  error: selectors.getIsFetchingUser(state),
  initialValues: selectors.getUser(state),
  ordersCount: selectors.getOrderItemsCount(state),
  invoicesCount: selectors.getInvoiceItemsCount(state),
  paymentsCount: selectors.getPaymentItemsCount(state),
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