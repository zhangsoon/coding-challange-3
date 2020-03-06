import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Colors from '../../../utils/Color';

const CircleImage = ({
  style,
  imageStyle,
  showShadow = false,
  source,
  height = 60,
  width = 60,
  onPress,
  onLongPress,
  children,
  borderWidth = StyleSheet.hairlineWidth,
  activeOpacity = 0.6,
  resizeMode = 'cover',
}) => {
  return onPress || onLongPress ? (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={() => onPress && onPress()}
      onLongPress={() => onLongPress && onLongPress()}
      delayLongPress={1000}
      style={[styles.roundedAvatar, style]}>
      <Image
        source={source}
        resizeMode={resizeMode}
        style={[
          {
            height: height,
            width: width,
            borderRadius: width / 2,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.borderColor,
          },
          imageStyle,
        ]}
      />
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[styles.roundedAvatar, style]}>
      <Image
        source={source}
        resizeMode={resizeMode}
        style={[
          {
            height: height,
            width: width,
            borderRadius: width / 2,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.borderColor,
          },
          imageStyle,
        ]}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  roundedAvatar: {
    backgroundColor: 'transparent',
  },
});

export default CircleImage;
