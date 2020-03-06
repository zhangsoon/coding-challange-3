import * as React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import {verticalScale} from '../../../utils/Scaling';

export const getFontSize = size => {
  switch (size) {
    case 'xsmall':
      return {fontSize: 10};
    case 'small':
      return {fontSize: 12};
    case 'medium':
      return {fontSize: 13};
    case 'large':
      return {fontSize: 15};
    case 'xlarge':
      return {fontSize: 18};
    case 'xxlarge':
      return {fontSize: 22};
    case 'xxxlarge':
      return {fontSize: 30};
    default:
      return getFontSize('medium');
  }
};

const CustomText = props => {
  const {style, size, children} = props;

  return (
    <Text {...props} style={[styles.text, getFontSize(size), style]} allowFontScaling={false}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Roboto',
  },
});

export default CustomText;
