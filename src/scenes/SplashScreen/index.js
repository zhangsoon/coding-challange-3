import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'dva';
import {moderateScale, viewPortHeight} from '../../utils/Scaling';
import * as selectors from '../../selectors/index';
import * as globalAction from '../../actions/global';
import _ from 'lodash';
import RNSplashScreen from 'react-native-splash-screen';
import AuthManager from '../../utils/AuthManager';

class SplashScreen extends Component {
  componentDidMount() {
    if (this.props.isRehydrationCompleted) {
    }
  }

  componentDidUpdate(prevProps) {
    // To make sure persisted states are completely rehydrated
    if (prevProps.isRehydrationCompleted !== this.props.isRehydrationCompleted) {
      if (this.props.isRehydrationCompleted) {
        this.proceedToNextScreen();
      }
    }
  }

  proceedToNextScreen = async () => {
    const loginToken = await AuthManager.retrieveToken();
    const {navigation} = this.props;

    RNSplashScreen.hide();

    !loginToken ? navigation.navigate('Login') : navigation.navigate('MainScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/*<CustomImage*/}
          {/*source={Images.logo}*/}
          {/*resizeMode="contain"*/}
          {/*showLoadingIndicator={false}*/}
          {/*style={styles.logo}*/}
          {/*/>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: moderateScale(200),
    height: moderateScale(200),
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: viewPortHeight * 0.3,
  },
});

function mapStateToProps(state) {
  return {
    isRehydrationCompleted: selectors.getIsRehydrationCompleted(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
