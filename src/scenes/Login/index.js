import React, {Component} from 'react';
import {connect} from 'dva';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import CustomText from '../components/CustomText/index';
import Color from '../../utils/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GLOBAL_HORIZONTAL_PADDING, moderateScale, verticalScale} from '../../utils/Scaling';
import Helper from '../../utils/Helper';
import Images from '../../assets/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as authActions from '../../actions/auth';
import * as selectors from '../../selectors';
import Toast from '../../utils/Toast';
import Icons from 'react-native-vector-icons/Ionicons';
import LoadingOverlay from '../components/LoadingOverlay';
import _ from 'lodash';

class Login extends Component {
  static navigationOptions = {
    headerMode: 'none',
  };
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      viewPassword: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onPressRegisterNow = () => {
    const {navigation} = this.props;
    navigation.navigate('SignUp');
  };

  onPressLogin = () => {
    if (this.validateData()) {
      this.loginRequest();
    }
  };

  loginRequest = () => {
    const {loginAccount} = this.props;
    const {userName, password} = this.state;
    loginAccount(userName, password);
  };

  validateData = () => {
    const {userName, password} = this.state;

    if (_.isEmpty(userName)) {
      Toast.error('Your user name is empty');
      return false;
    }
    if (_.isEmpty(password)) {
      Toast.error('Your password is empty');
      return false;
    }

    return true;
  };

  onChangeUserNameText = text => {
    this.setState({
      userName: text,
    });
  };

  onChangePasswordText = text => {
    this.setState({
      password: text,
    });
  };

  handleUserNameReference = input => (this.userNameTextInput = input);

  handlePasswordReference = input => (this.passwordTextInput = input);

  onSubmitUserNameEditing = () => {
    this.passwordTextInput.focus();
  };

  onSubmitPasswordEditing = () => {
    this.onPressLogin();
  };

  onPressViewPassword = () => {
    const {viewPassword} = this.state;
    this.setState({
      viewPassword: !viewPassword,
    });
  };

  render() {
    const {mobileNumber, password, viewPassword} = this.state;
    const {loginLoading} = this.props;

    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          contentInset={{bottom: 15}}>
          <KeyboardAvoidingView behavior={Helper.IS_IOS ? 'padding' : null} style={styles.container}>
            <View style={styles.mainContentContainer}>
              <Image source={Images.reactnativeImage} style={styles.logoStyle} />
              <View style={styles.bottomContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.iconTextInputContainer}>
                    <MaterialCommunityIcons
                      name="account-circle-outline"
                      size={18}
                      color={Color.mutedColor}
                    />
                    <TextInput
                      style={{flex: 1, marginLeft: moderateScale(8)}}
                      textInputStyle={[styles.iconTextInput, {marginLeft: 0}]}
                      value={mobileNumber}
                      ref={this.handleUserNameReference}
                      returnKeyType="next"
                      onSubmitEditing={this.onSubmitUserNameEditing}
                      onChangeText={this.onChangeUserNameText}
                      placeholder={'Input user name here'}
                    />
                  </View>
                  <View style={[styles.iconTextInputContainer, {marginTop: moderateScale(15)}]}>
                    <MaterialCommunityIcons name="lock" size={18} color={Color.mutedColor} />
                    <TextInput
                      style={{flex: 1, marginLeft: moderateScale(8)}}
                      secureTextEntry={!viewPassword}
                      value={password}
                      returnKeyType="done"
                      ref={this.handlePasswordReference}
                      onChangeText={this.onChangePasswordText}
                      textInputStyle={styles.iconTextInput}
                      onSubmitEditing={this.onSubmitPasswordEditing}
                      placeholder={'Input password here'}
                    />
                    <TouchableOpacity onPress={this.onPressViewPassword}>
                      <Icons
                        name={viewPassword ? 'ios-eye-off' : 'ios-eye'}
                        size={22}
                        color={!_.isEmpty(password) ? 'black' : Color.mutedColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.loginContainer}>
                  <TouchableOpacity
                    onPress={this.onPressLogin}
                    activeOpacity={0.6}
                    style={styles.loginButtonStyle}>
                    <CustomText style={{color: 'white', fontWeight: 'bold'}}>Login</CustomText>
                  </TouchableOpacity>

                  <View style={styles.dontHaveAccountContainer}>
                    <CustomText>Not have account?</CustomText>
                    <TouchableOpacity activeOpacity={0.6} onPress={this.onPressRegisterNow}>
                      <CustomText style={styles.registerNowText}>Register Now</CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <LoadingOverlay loading={loginLoading} />
      </View>
    );
  }
}

Login.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    paddingTop: Helper.IS_IOS
      ? Helper.isIphoneX()
        ? moderateScale(40)
        : moderateScale(30)
      : moderateScale(15),
  },
  mainContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAsAGuestButtonText: {},
  logoStyle: {
    width: moderateScale(150),
    height: moderateScale(150),
    resizeMode: 'contain',
  },
  iconTextInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: verticalScale(10),
    borderWidth: 1,
    borderRadius: 20,
    marginTop: moderateScale(10),
    borderColor: Color.borderColor,
  },
  iconTextInput: {
    borderWidth: 0,
    marginLeft: 10,
    padding: 0,
  },
  inputContainer: {
    marginTop: moderateScale(12),
  },
  bottomContainer: {
    width: '80%',
  },
  rememberMeForgotPasswordContainer: {
    marginTop: moderateScale(12),
    paddingHorizontal: moderateScale(3),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingRight: 3,
  },
  rememberMeText: {
    marginLeft: moderateScale(5),
  },
  forgotPasswordText: {},
  loginContainer: {
    marginTop: moderateScale(15),
  },
  dontHaveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(15),
  },
  registerNowText: {
    textDecorationLine: 'underline',
    color: Color.primaryThemeColor,
    marginLeft: moderateScale(3),
  },
  loginButtonStyle: {
    backgroundColor: Color.primaryThemeColor,
    marginTop: verticalScale(15),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

function mapStateToProps(state) {
  return {
    loginLoading: selectors.getLoginLoading(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginAccount: (userName, password) => dispatch(authActions.loginAccountRequest(userName, password)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
