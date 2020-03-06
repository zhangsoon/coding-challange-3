import React, {PureComponent} from 'react';
import {Dialog, SlideAnimation} from 'react-native-popup-dialog';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale, verticalScale} from '../../../utils/Scaling';
import CustomText from '../CustomText';
import CustomButton from '../CustomButton';
import Colors from '../../../utils/Color';

const slideAnimation = new SlideAnimation({slideFrom: 'bottom'});

class GeneralPopUpDialog extends PureComponent {
  onDismissed = () => {
    const {onDismissed} = this.props;

    onDismissed && onDismissed();
  };

  onPress = () => {
    const {onPress} = this.props;

    onPress && onPress();
  };

  onPressCancel = () => {
    const {onPressCancel} = this.props;

    onPressCancel && onPressCancel();
  };

  onHardwareBackPress = () => {
    const {visible} = this.props;
    if (visible) {
      this.onPress();
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {
      visible = false,
      width = 0.8,
      height = 0.3,
      title,
      description,
      buttonTitle,
      cancelButtonTitle,
    } = this.props;
    return (
      <Dialog
        visible={visible}
        width={width}
        hasOverlay
        height={height}
        dialogAnimation={slideAnimation}
        overlayOpacity={0.7}
        dialogStyle={styles.dialogStyle}
        onDismissed={this.onDismissed}
        onHardwareBackPress={this.onHardwareBackPress}>
        <View style={styles.contentContainer}>
          <CustomText size="xxlarge" style={styles.titleTextStyle}>
            {title}
          </CustomText>
          <CustomText style={styles.descriptionTextStyle}>{description}</CustomText>
          <CustomButton
            title={buttonTitle}
            style={styles.buttonContainer}
            textStyle={styles.buttonTextStyle}
            onPress={this.onPress}
          />

          {cancelButtonTitle ? (
            <CustomButton
              title={cancelButtonTitle}
              style={styles.cancelButtonContainer}
              textStyle={styles.buttonTextStyle}
              onPress={this.onPressCancel}
            />
          ) : (
            false
          )}
        </View>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dialogStyle: {
    borderRadius: 20,
    height: 'auto',
  },
  contentContainer: {
    paddingVertical: verticalScale(30),
    paddingHorizontal: moderateScale(35),
  },
  titleTextStyle: {
    fontWeight: 'bold',
    color: Colors.primaryThemeColor,
    textAlign: 'center',
  },
  descriptionTextStyle: {
    lineHeight: 18,
    marginTop: verticalScale(8),
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: verticalScale(20),
    backgroundColor: Colors.primaryThemeColor,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  cancelButtonContainer: {
    marginTop: verticalScale(20),
    backgroundColor: Colors.mutedColor,
  },
});

export default GeneralPopUpDialog;
