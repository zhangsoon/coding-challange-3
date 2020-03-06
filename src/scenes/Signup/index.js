import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {
  GLOBAL_HORIZONTAL_PADDING,
  GLOBAL_VERTICAL_PADDING,
  moderateScale,
  verticalScale,
} from '../../utils/Scaling';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import CustomTextInput from '../components/CustomTextInput';
import Color from '../../utils/Color';
import CustomText from '../components/CustomText';
import {connect} from 'dva';
import * as selectors from '../../selectors';
import * as authAction from '../../actions/auth';
import Toast from '../../utils/Toast';
import LoadingOverlay from '../components/LoadingOverlay';
import CircleImage from '../components/CircleImage';
import Images from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import AndroidOpenSettings from 'react-native-android-open-settings';
import Permissions from 'react-native-permissions';
import GeneralPopUpDialog from '../components/GeneralPopUpDialog';
import _ from 'lodash';
import Helper from '../../utils/Helper';

const cameraOption = ['cancel', 'Take Photo', 'Select From Album'];

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      hobbies: '',
      showPassword: false,
      showRetypePassword: false,
      userErrorMessage: null,
      image: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.registerStatus !== prevProps.registerStatus) {
      if (this.props.registerStatus) {
        Toast.success('You have register successfully');
        this.props.navigation.navigate('Login');
      }
    }
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack(null);
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

  onChangeRetypePasswordText = text => {
    this.setState({retypePassword: text});
  };

  onChangeFirstNameText = text => {
    this.setState({firstName: text});
  };
  onChangeLastNameText = text => {
    this.setState({lastName: text});
  };

  onChangeEmailText = text => {
    this.setState({email: text});
  };

  onChangeAgeText = text => {
    this.setState({age: text});
  };

  onChangeHobbiesText = text => {
    this.setState({hobbies: text});
  };

  onPressRegister = () => {
    if (this.validateRegisterData()) {
      this.registerNewUser();
    }
  };

  onPressShowPassword = () => {
    const {showPassword} = this.state;
    this.setState({showPassword: !showPassword});
  };

  onPressShowRetypePassword = () => {
    const {showRetypePassword} = this.state;
    this.setState({showRetypePassword: !showRetypePassword});
  };

  onSubmitUserNameEditing = () => {
    const {user} = this.props;

    if (!_.isEmpty(user)) {
      let newUser = _.find(user, item => {
        let userName = _.get(item, ['userName'], null);
        return _.isEqual(this.state.userName, userName);
      });
      if (!_.isEmpty(newUser)) {
        this.setState({userErrorMessage: 'This user name have been use before.Please enter another.'});
      }
    }

    if (this.password) {
      this.password.focus();
    }
  };

  onUserNameFocus = () => {
    this.setState({userErrorMessage: null});
  };

  validateRegisterData = () => {
    const {
      userName,
      password,
      retypePassword,
      firstName,
      lastName,
      email,
      age,
      hobbies,
      image,
      userErrorMessage,
    } = this.state;

    if (_.isEmpty(userName)) {
      Toast.error('Your user name is empty');
      return false;
    }
    if (_.isEmpty(password)) {
      Toast.error('Your password is empty');
      return false;
    }
    if (_.isEmpty(retypePassword)) {
      Toast.error('Your retype password is empty');
      return false;
    }
    if (_.isEmpty(firstName)) {
      Toast.error('Your first name is empty');
      return false;
    }
    if (_.isEmpty(lastName)) {
      Toast.error('Your last name is empty');
      return false;
    }
    if (_.isEmpty(email)) {
      Toast.error('Your email is empty');
      return false;
    }
    if (_.isEmpty(age)) {
      Toast.error('Your age is empty');
      return false;
    }
    if (_.isEmpty(hobbies)) {
      Toast.error('Your hobbies is empty');
      return false;
    }
    if (_.isEmpty(image)) {
      Toast.error('Your image is empty');
      return false;
    }
    if (!_.isEmpty(userErrorMessage)) {
      Toast.error('Please change your user name');
      return false;
    }
    if (!_.isEqual(password, retypePassword)) {
      Toast.error('Your password is not match!');
      return false;
    }
    if (!Helper.validateEmail(email)) {
      Toast.error('Your email format is wrong');
      return false;
    }
    return true;
  };

  registerNewUser = () => {
    const {registerNewUser} = this.props;
    const {userName, password, firstName, lastName, email, age, hobbies, image} = this.state;

    let saveData = {
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      hobbies: hobbies,
      image: image,
    };

    registerNewUser(saveData);
  };

  onPressTakeImage = () => {
    this.CameraActionSheet.show();
  };

  onPressCameraActionSheetItem = index => {
    const options = {
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
    };

    setTimeout(() => {
      switch (index) {
        case 1:
          ImagePicker.openCamera(options)
            .then(this.onReceivedImagePickerResponse)
            .catch(this.handleImagePickerFromCameraErrorResponse);
          break;
        case 2:
          ImagePicker.openPicker(options)
            .then(this.onReceivedImagePickerResponse)
            .catch(this.handleImagePickerFromPhotoLibraryErrorResponse);
          break;
      }
    }, 300);
  };
  handleImagePickerFromCameraErrorResponse = error => {
    const errorMsg = error.toString();

    /** Determine error in a very hack way **/
    if (errorMsg.toLowerCase().indexOf('cancelled') === -1) {
      if (
        errorMsg.toLowerCase().indexOf('permission') === -1 &&
        errorMsg.toLowerCase().indexOf('cannot') === -1
      ) {
        Toast.error(error.toString());
        return;
      }

      this.openPermissionDialog('camera');
    }
  };

  handleImagePickerFromPhotoLibraryErrorResponse = error => {
    const errorMsg = error.toString();

    /** Determine error in a very hack way **/
    if (errorMsg.toLowerCase().indexOf('cancelled') === -1) {
      if (
        errorMsg.toLowerCase().indexOf('permission') === -1 &&
        errorMsg.toLowerCase().indexOf('cannot') === -1
      ) {
        Toast.error(error.toString());
        return;
      }

      this.openPermissionDialog('library');
    }
  };

  openPermissionDialog = type => {
    const {isPermissionDialogVisible} = this.state;
    this.setState({
      isPermissionDialogVisible: !isPermissionDialogVisible,
      permissionType: type,
    });
  };

  onPressNotNowPermission = () => {
    const {isPermissionDialogVisible} = this.state;
    this.setState({
      isPermissionDialogVisible: !isPermissionDialogVisible,
    });
  };

  openSettings = () => {
    if (Helper.IS_IOS && Permissions.canOpenSettings()) {
      Permissions.openSettings();
    } else if (Helper.IS_ANDROID) {
      AndroidOpenSettings.applicationSettings();
    }
  };

  onReceivedImagePickerResponse = image => {
    const {path} = image;
    this.setState({image: path});
    //  this.updateAvatarRequest(data, formattedMime);
  };

  handlePasswordTextInputReference = ref => (this.password = ref);

  handleRetypePasswordTextInputReference = ref => (this.retypePassword = ref);

  handleFirstNameTextInputReference = ref => (this.firstName = ref);

  handleLastNameTextInputReference = ref => (this.lastName = ref);

  handleAgeTextInputReference = ref => (this.age = ref);

  handleEmailTextInputReference = ref => (this.email = ref);

  handleHobbiesTextInputReference = ref => (this.hobbies = ref);

  onSubmitPasswordEditing = () => {
    if (this.retypePassword) {
      this.retypePassword.focus();
    }
  };

  onSubmitRetypePasswordEditing = () => {
    if (this.firstName) {
      this.firstName.focus();
    }
  };

  onSubmitFirstNameEditing = () => {
    if (this.lastName) {
      this.lastName.focus();
    }
  };

  onSubmitLastNameEditing = () => {
    if (this.email) {
      this.email.focus();
    }
  };

  onSubmitEmailEditing = () => {
    if (this.age) {
      this.age.focus();
    }
  };

  onSubmitAgeEditing = () => {
    if (this.hobbies) {
      this.hobbies.focus();
    }
  };

  render() {
    const {
      userName,
      password,
      showPassword,
      retypePassword,
      showRetypePassword,
      firstName,
      lastName,
      email,
      age,
      hobbies,
      userErrorMessage,
      isPermissionDialogVisible,
      permissionType,
      image,
    } = this.state;

    const {registerLoading} = this.props;

    return (
      <View style={styles.container}>
        <GeneralPopUpDialog
          visible={isPermissionDialogVisible}
          title={
            _.isEqual(permissionType, 'camera')
              ? 'Almost there!'
              : 'Enable to access your camera to use this function.'
          }
          description={
            _.isEqual(permissionType, 'camera')
              ? 'Almost there!'
              : 'Enable to access your photo library to use this function.'
          }
          buttonTitle="Sure"
          cancelButtonTitle="Not Now"
          onPress={this.openSettings}
          onPressCancel={this.onPressNotNowPermission}
        />
        <CustomHeaderComponent onPressLeft={this.onPressBack} title="Sign Up Form">
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View>
              <CustomTextInput
                onChangeText={this.onChangeUserNameText}
                style={{marginTop: verticalScale(15)}}
                value={userName}
                label="User Name"
                placeHolderText="Please enter your user name"
                onFocus={this.onUserNameFocus}
                onSubmitEditing={this.onSubmitUserNameEditing}
              />
              {userErrorMessage ? (
                <CustomText
                  style={{
                    color: Color.redTextColor,
                    marginTop: verticalScale(5),
                    paddingLeft: moderateScale(20),
                  }}>
                  {userErrorMessage}
                </CustomText>
              ) : (
                false
              )}
              <CustomTextInput
                style={{marginTop: verticalScale(15)}}
                value={password}
                label="Password"
                onChangeText={this.onChangePasswordText}
                secureTextEntry={!showPassword}
                placeHolderText="Please enter your password"
                onPressIcon={this.onPressShowPassword}
                onSubmitEditing={this.onSubmitPasswordEditing}
                icon
                reference={this.handlePasswordTextInputReference}
              />
              <CustomTextInput
                style={{marginTop: verticalScale(15)}}
                value={retypePassword}
                label="Retype Password"
                onChangeText={this.onChangeRetypePasswordText}
                secureTextEntry={!showRetypePassword}
                placeHolderText="Please enter your password again"
                onSubmitEditing={this.onSubmitRetypePasswordEditing}
                onPressIcon={this.onPressShowRetypePassword}
                reference={this.handleRetypePasswordTextInputReference}
                icon
              />
              <CustomTextInput
                onChangeText={this.onChangeFirstNameText}
                style={{marginTop: verticalScale(15)}}
                value={firstName}
                label="First Name"
                onSubmitEditing={this.onSubmitFirstNameEditing}
                reference={this.handleFirstNameTextInputReference}
                placeHolderText="Please enter your first name"
              />
              <CustomTextInput
                onChangeText={this.onChangeLastNameText}
                style={{marginTop: verticalScale(15)}}
                reference={this.handleLastNameTextInputReference}
                onSubmitEditing={this.onSubmitLastNameEditing}
                value={lastName}
                label="Last Name"
                placeHolderText="Please enter your last name"
              />
              <CustomTextInput
                style={{marginTop: verticalScale(15)}}
                value={email}
                reference={this.handleEmailTextInputReference}
                onSubmitEditing={this.onSubmitEmailEditing}
                label="Email Address"
                placeHolderText="Please enter your email name"
                onChangeText={this.onChangeEmailText}
              />
              <CustomTextInput
                style={{marginTop: verticalScale(15)}}
                value={age}
                onChangeText={this.onChangeAgeText}
                onSubmitEditing={this.onSubmitAgeEditing}
                label="Age"
                reference={this.handleAgeTextInputReference}
                placeHolderText="Please enter your age"
                keyboardType="number-pad"
              />
              <CustomTextInput
                onChangeText={this.onChangeHobbiesText}
                style={{marginTop: verticalScale(15)}}
                reference={this.handleHobbiesTextInputReference}
                value={hobbies}
                placeHolderText="Please enter your hobbies"
                label="Hobbies"
              />
              <View style={{marginTop: verticalScale(15), marginLeft: moderateScale(20)}}>
                <CustomText>Click below to upload your avatar</CustomText>
                <View style={{flexDirection: 'row', marginTop: verticalScale(10)}}>
                  {image ? (
                    <View>
                      <CircleImage
                        source={image ? {uri: image} : Images.placeholder}
                        width={moderateScale(70)}
                        height={moderateScale(70)}
                        onPress={this.onPressTakeImage}
                      />
                      <View style={{position: 'absolute', bottom: -5, right: 5}}>
                        <Ionicons name="ios-camera" size={25} color="gray" />
                      </View>
                    </View>
                  ) : (
                    <View>
                      <CircleImage
                        source={image ? {uri: image} : Images.placeholder}
                        width={moderateScale(70)}
                        height={moderateScale(70)}
                        onPress={this.onPressTakeImage}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          right: 0,
                          left: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Ionicons name="ios-camera" size={25} color="white" />
                      </View>
                    </View>
                  )}
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.registerButtonStyle}
                onPress={this.onPressRegister}>
                <CustomText style={{color: 'white', fontWeight: 'bold'}}>Register Now</CustomText>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <LoadingOverlay loading={registerLoading} />
        </CustomHeaderComponent>
        <ActionSheet
          ref={o => (this.CameraActionSheet = o)}
          options={cameraOption}
          cancelButtonIndex={0}
          title="Select Picture"
          onPress={this.onPressCameraActionSheetItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    paddingVertical: GLOBAL_VERTICAL_PADDING,
  },
  registerButtonStyle: {
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
    user: selectors.getUserData(state),
    registerLoading: selectors.getRegisterLoading(state),
    registerStatus: selectors.getRegisterStatus(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerNewUser: data => dispatch(authAction.registerNewUserRequest(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
