import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from '../../../components/CustomText';
import {verticalScale} from '../../../../utils/Scaling';
import Colors from '../../../../utils/Color';

class DrawerMenuItem extends PureComponent {
  onPressLogout = () => {
    const {onPressLogout} = this.props;

    onPressLogout && onPressLogout();
  };

  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.6} onPress={this.onPressLogout} style={styles.menuItemContainer}>
          <CustomText size="xxlarge" style={[styles.menuItemTextStyle, {color: Colors.redTextColor}]}>
            Logout
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  menuItemContainer: {
    paddingVertical: verticalScale(15),
  },
  menuItemTextStyle: {
    fontWeight: 'bold',
  },
});

export default DrawerMenuItem;
