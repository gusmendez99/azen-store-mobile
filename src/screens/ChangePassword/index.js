import React from 'react';
import { StyleSheet, View } from 'react-native';
//import Button from 'react-native-button';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Text, Input, Button } from '../../components/UIComponents'
import AnimatedLoader from 'react-native-animated-loader';

import * as actions from '../../redux/user/user.actions';
import * as selectors from '../../redux/root-reducer';

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

const ChangePassword = ({ isChangingPassword, error, onChangePassword, handleSubmit }) => {

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.centerTitle]}>Change your password</Text>
        <Field
          name={'oldPassword'}
          props={{
            placeholder: 'Enter old password...',
            rounded: true,
            borderless: true,
            underlineColorAndroid: 'transparent',
            password: true,
            viewPass: true,
          }}
          component={renderInput}
        />
        <Field
          name={'newPassword1'}
          props={{
            placeholder: 'Enter new password...',
            rounded: true,
            borderless: true,
            underlineColorAndroid: 'transparent',
            password: true,
            viewPass: true,
          }}
          component={renderInput}
        />
        <Field
          name={'newPassword2'}
          props={{
            placeholder: 'Confirm new password...',
            rounded: true,
            borderless: true,
            underlineColorAndroid: 'transparent',
            password: true,
            viewPass: true,
          }}
          component={renderInput}
        />


      {
              isChangingPassword ? (
                <AnimatedLoader visible={true} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} speed={1} />
              ) : (
                <Button
                  round 
                  uppercase
                  style={styles.button}
                  onPress={handleSubmit(onChangePassword)}>
                  Change password
                </Button>
                )
            }

            {
              error && (
                <Text>{error}</Text>
              )
            }

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  centerTitle: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
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
});

const mapStateToProps = state => ({
  isChangingPassword: selectors.getIsChangingPassword(state),
  error: selectors.getIsFetchingUserError(state)
})

const mapDispatchToProps = dispatch => ({
  onChangePassword(values) {
    const { newPassword1, newPassword2, oldPassword } = values;
    if (
      newPassword1.length <= 0 ||
      newPassword2.length <= 0 ||
      oldPassword.length <= 0
    ) {
      alert('Please fill out the required fields.');
      return;
    }
    dispatch(actions.startChangingPassword({newPassword1, newPassword2, oldPassword}));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: 'change-password-form'})(ChangePassword)
);
