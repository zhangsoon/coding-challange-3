import React from 'react';
import {NetInfo, StatusBar, StyleSheet, View} from 'react-native';
import screenTracking from '../services/middlewares/screenTracking';
import RNDropdownAlert from 'react-native-dropdownalert';
import DropDownAlert from '../lib/DropDownAlert';
import Helpers from '../utils/Helper';
import AppNavigator from './AppRouteConfigs';
import NavigationService from './NavigationService';
import {connect} from 'dva';
import * as selectors from '../selectors';
import {getFontSize} from '../scenes/components/CustomText/index';

class RootNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.isRehydrationCompleted !== nextProps.isRehydrationCompleted) {
      if (nextProps.isRehydrationCompleted) {
      }
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.container}>
        {Helpers.IS_IOS && <StatusBar backgroundColor="#fff" barStyle="dark-content" />}

        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />

        <RNDropdownAlert
          defaultContainer={styles.dropDownContainer}
          ref={ref => DropDownAlert.setDropDown(ref)}
          renderTitle={() => false}
          //imageStyle={{height: 60, width: 60, alignSelf: 'center'}}
          defaultTextContainer={{padding: 15, flex: 1}}
          messageStyle={{
            textAlign: 'left',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'transparent',
            ...getFontSize('medium'),
          }}
          closeInterval={5000}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropDownContainer: {
    padding: 8,
    paddingTop: 10,
    flexDirection: 'row',
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
)(RootNavigator);
