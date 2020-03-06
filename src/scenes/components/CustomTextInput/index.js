/**
 * Copyright 2019 - present, Alpstein Technology Sdn Bhd.
 * All rights reserved.
 */
import * as React from 'react';
import {TextInput, View, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale, verticalScale} from '../../../utils/Scaling';
import Colors from '../../../utils/Color';
import CustomText, {getFontSize} from '../CustomText';
import Icons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

const CustomTextInput = ({
  style,
  label,
  placeHolderText,
  onChangeText,
  keyboardType = 'default',
  editable = true,
  value,
  labelTextStyle,
  onFocus = () => {},
  reference,
  multiline = false,
  numberOfLines,
  clearButtonMode = 'never',
  textInputStyle,
  returnKeyType = 'next',
  onSubmitEditing = () => {},
  onBlur = () => {},
  secureTextEntry = false,
  isRequired = false,
  onLayout = () => {},
  disabled = false,
  autoCompleteType = 'off',
  icon = false,
  onPressIcon = () => {},
}) => {
  return (
    <View style={[styles.textInputContainer, style, disabled ? {opacity: 0.5} : false]}>
      {isRequired && label ? (
        <View style={styles.requiredContainer}>
          <CustomText size="small" style={labelTextStyle}>
            {label}
          </CustomText>
          <CustomText size="small" style={styles.requiredTextStyle}>
            *
          </CustomText>
        </View>
      ) : label ? (
        <CustomText size="small" style={labelTextStyle}>
          {label}
        </CustomText>
      ) : (
        false
      )}
      <View style={{flexDirection: 'row'}}>
        <TextInput
          ref={reference}
          onLayout={onLayout}
          onBlur={onBlur}
          allowFontScaling={false}
          underlineColorAndroid="transparent"
          placeholder={placeHolderText}
          placeholderTextColor={Colors.placeholderColor}
          onChangeText={text => onChangeText(text)}
          style={[styles.textInputStyle, textInputStyle]}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onFocus={() => {
            onFocus();
          }}
          autoCompleteType={autoCompleteType}
          editable={editable}
          value={value}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onSubmitEditing={() => onSubmitEditing()}
          secureTextEntry={secureTextEntry}
          clearButtonMode={clearButtonMode}
        />
        {icon ? (
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.6} onPress={onPressIcon}>
            <Icons
              name={secureTextEntry ? 'ios-eye-off' : 'ios-eye'}
              size={22}
              color={!_.isEmpty(secureTextEntry) ? 'black' : Colors.mutedColor}
            />
          </TouchableOpacity>
        ) : (
          false
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'white',
    borderRadius: 40,
    paddingHorizontal: moderateScale(25),
    paddingVertical: verticalScale(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
  },
  textInputStyle: {
    flex: 1,
    ...getFontSize('medium'),
    paddingTop: verticalScale(5),
    fontFamily: 'roboto',
    fontWeight: 'bold',
  },
  requiredContainer: {
    flexDirection: 'row',
  },
  requiredTextStyle: {
    color: 'red',
    marginLeft: moderateScale(5),
  },
  buttonContainer: {
  },
});

export default CustomTextInput;
