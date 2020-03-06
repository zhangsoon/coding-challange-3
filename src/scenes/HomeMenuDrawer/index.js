import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import {moderateScale, verticalScale} from '../../utils/Scaling';
import CircleImage from '../components/CircleImage';
import Images from '../../assets';
import CustomText from '../components/CustomText';
import DrawerMenuItem from './components/DrawerMenuItem';
import * as selectors from '../../selectors';
import * as globalAction from '../../actions/global';
import * as authAction from '../../actions/auth';
import {connect} from 'dva/index';
import * as authSelectors from '../../selectors/auth';
import Colors from '../../utils/Color';
import auth from '../../models/auth';

class HomeMenuDrawer extends Component {
  onPressLeftButton = () => {
    this.props.navigation.closeDrawer();
  };

  onPressLogout = () => {
    Alert.alert(
      '',
      'Are you sure to log out?',
      [{text: 'No', style: 'cancel'}, {text: 'Yes', onPress: this.startLogout}],
      {cancelable: false},
    );
  };

  startLogout = () => {
    const {logoutAccount} = this.props;

    logoutAccount();
  };

  onPressFeedbackHistory = () => {
    const {navigation} = this.props;

    navigation.navigate('FeedbackHistory');
  };

  render() {
    const {authUser} = this.props;

    const imageLargeSrc = authSelectors.getUserDataImage(authUser);

    const firstName = authSelectors.getUserDataFirstName(authUser);

    const lastName = authSelectors.getUserDataLastName(authUser);

    return (
      <View style={styles.container}>
        <CustomHeaderComponent onPressLeft={this.onPressLeftButton}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.userContainer}>
              <CircleImage
                  borderWidth
                source={imageLargeSrc ? {uri: imageLargeSrc} : Images.placeholder}
                height={verticalScale(80)}
                width={verticalScale(80)}
              />
              <View style={styles.userDetailContainer}>
                <CustomText style={styles.userDetailTextStyle}>{`(${firstName} ${lastName})`}</CustomText>
              </View>
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.menuContentContainer}>
              <DrawerMenuItem
                onPressAlertStatus={this.onPressAlertStatus}
                onPressLogout={this.onPressLogout}
                onPressFeedbackHistory={this.onPressFeedbackHistory}
              />
            </View>
          </ScrollView>
        </CustomHeaderComponent>
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
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(15),
  },
  userContainer: {
    alignItems: 'center',
  },
  userDetailContainer: {
    marginTop: verticalScale(15),
    flex: 1,
  },
  userNameTextStyle: {
    fontWeight: '500',
    fontStyle: 'italic',
  },
  userDetailTextStyle: {
    marginTop: verticalScale(5),
    textAlign: 'center',
  },
  menuContentContainer: {
    marginTop: verticalScale(15),
  },
  versionText: {
    alignItems: 'flex-end',
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(20),
  },
  horizontalLine: {
    marginTop: verticalScale(15),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
  },
});

function mapStateToProps(state) {
  return {
    authUser: selectors.getCurrentUser(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAccount: () => dispatch(authAction.logoutRequest()),
    setGlobalDrawerStatus: drawerStatus => dispatch(globalAction.setGlobalDrawerStatus(drawerStatus)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeMenuDrawer);
