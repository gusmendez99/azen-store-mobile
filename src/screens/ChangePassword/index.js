import React from 'react';
//import Button from 'react-native-button';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  View
} from 'react-native';
import { Text, Input, Button, Block, Icon, theme } from '../../components/UIComponents';
import { Field, reduxForm } from 'redux-form';
import { AppStyles } from '../../AppStyles';
import AnimatedLoader from 'react-native-animated-loader';

import * as actions from '../../redux/user/user.actions';
import * as selectors from '../../redux/root-reducer';


const { width, height } = Dimensions.get("screen");

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
    /*<View style={styles.container}>
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

      
    </View>*/

    <Block flex middle>
      <ImageBackground
        source={{ uri: "https://raw.githubusercontent.com/creativetimofficial/argon-react-native/master/assets/imgs/register-bg.png" }}
        style={{ width, height, zIndex: 1, marginTop: 150 }}
      >
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" h5>
                Change Password
                </Text>
            </Block>
            <Block flex>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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

                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
                  </Block>

                  <Block middle>
                    {
                      isChangingPassword ? (
                        <AnimatedLoader visible={true} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} speed={1} />
                      ) : (
                          <Button round color="primary" style={styles.createButton} onPress={handleSubmit(onChangePassword)}>
                            <Text bold size={14} color={theme.COLORS.WHITE}>
                              CHANGE PASSWORD
                                  </Text>
                          </Button>
                        )
                    }

                    {
                      error && (
                        <Text>{error}</Text>
                      )
                    }

                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>

  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.5,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    marginTop: -64,
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: theme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: theme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
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
    dispatch(actions.startChangingPassword({ newPassword1, newPassword2, oldPassword }));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: 'change-password-form' })(ChangePassword)
);
