import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import CustomText from '../components/CustomText';
import * as selectors from '../../selectors';
import * as authAction from '../../actions/auth';
import {connect} from 'dva';
import {moderateScale, verticalScale} from '../../utils/Scaling';
import * as authSeletors from '../../selectors/auth';
import InfoItemComponent from '../components/InfoItemComponent';
import auth from '../../models/auth';

class Main extends Component {
  onPressDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    const {currentUser} = this.props;
    const userName = authSeletors.getUserDataUserName(currentUser);
    const lastName = authSeletors.getUserDataLastName(currentUser);
    const firstName = authSeletors.getUserDataFirstName(currentUser);
    const email = authSeletors.getUserDataEmail(currentUser);
    const age = authSeletors.getUserDataAge(currentUser);
    const hobbies = authSeletors.getUserDataHobbies(currentUser);
    return (
      <View style={styles.container}>
        <CustomHeaderComponent leftIcon="ios-menu" title="Profile" onPressLeft={this.onPressDrawer}>
          <View style={styles.contentContainer}>
            <CustomText size="xlarge" style={{fontWeight: 'bold'}}>
              Your Info
            </CustomText>
            <InfoItemComponent label="Your User Name: " text={userName} />
            <InfoItemComponent label="Your First Name: " text={firstName} />
            <InfoItemComponent label="Your Last Name: " text={lastName} />
            <InfoItemComponent label="Your Email : " text={email} />
            <InfoItemComponent label="Your Age: " text={age} />
            <InfoItemComponent label="Your Hobbies: " text={hobbies} />
          </View>
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
    flex: 1,
    paddingHorizontal: moderateScale(30),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
});

function mapStateToProps(state) {
  return {
    currentUser: selectors.getCurrentUser(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
