import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import AnimatedLoader from 'react-native-animated-loader';

import * as actions from '../../redux/user/user.actions';
import * as selectors from '../../redux/root-reducer';

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

const ChangePassword = ({ isChangingPassword, error, onChangePassword, handleSubmit }) => {

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.centerTitle]}>Change your password</Text>
      <View style={styles.InputContainer}>
        <Field
          name={'oldPassword'}
          props={{
            placeholder: 'Enter old password...',
            secureTextEntry: true,
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'newPassword1'}
          props={{
            placeholder: 'Enter new password...',
            secureTextEntry: true,
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>
      <View style={styles.InputContainer}>
        <Field
          name={'newPassword2'}
          props={{
            placeholder: 'Confirm new password...',
            secureTextEntry: true,
            placeholderTextColor: AppStyles.color.grey,
            underlineColorAndroid: 'transparent',
          }}
          component={renderInput}
        />
      </View>


      {
              isChangingPassword ? (
                <AnimatedLoader visible={true} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} speed={1} />
              ) : (
                <Button
        containerStyle={[styles.loginContainer, { marginTop: 50 }]}
        style={styles.loginText}
        onPress={handleSubmit(onChangePassword)}>
        Change password
      </Button>
                )
            }

            {
              error && (
                <Text style={styles.name}>
                  {error}
                </Text>
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
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  centerTitle: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  name: {
    fontSize: 22,
    color: "#ff5ea3",
    fontWeight: '600',
    marginBottom: 16
  },
  lottie: { 
    width: 100, 
    height: 100, 
  }
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
