import CustomText from '../CustomText';
import {StyleSheet, View} from 'react-native';
import React, {PureComponent} from 'react';
import {moderateScale, verticalScale} from '../../../utils/Scaling';

class InfoItemComponent extends PureComponent {
  render() {
    const {label, text} = this.props;
    return (
      <View style={styles.itemContainer}>
        <CustomText style={{fontWeight: 'bold'}}>{label}</CustomText>
        <CustomText>{text}</CustomText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
});

export default InfoItemComponent;
