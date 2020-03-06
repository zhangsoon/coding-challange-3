import React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator, View} from 'react-native';
import {moderateScale, verticalScale} from '../../../utils/Scaling';
import CustomText from '../CustomText/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../../utils/Color';

const CustomButton = ({
  disabled = false,
  style,
  onPress = () => {},
  title,
  loading = false,
  textStyle,
  showShadow = false,
  iconName,
  iconSize = 20,
  children,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      style={[
        styles.container,
        disabled
          ? {
              backgroundColor: Color.mutedColor,
            }
          : false,
        style,
        showShadow
          ? {
              shadowOpacity: 0.6,
              shadowRadius: 5,
              shadowColor: 'gray',
              shadowOffset: {height: 5, width: 0},
            }
          : false,
      ]}
      onPress={() => onPress && onPress()}>
      <View style={styles.titleContainer}>
        {iconName ? <MaterialCommunityIcons name={iconName} size={iconSize} color="white" /> : false}
        <CustomText size="large" style={[styles.buttonText, textStyle, disabled ? {color: 'white'} : false]}>
          {title}
        </CustomText>
        {loading ? <ActivityIndicator style={{marginLeft: 15}} size="small" color="white" /> : false}
      </View>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: Color.primaryThemeColor,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomButton;
