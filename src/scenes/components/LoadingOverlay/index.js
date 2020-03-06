import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomText from '../CustomText/index';
import {moderateScale} from '../../../utils/Scaling';
import Colors from '../../../utils/Color';

class LoadingOverlay extends React.Component {
  getComponent = () => {
    const {loading, containerStyle, hideText = false, transparent, style} = this.props;

    return loading ? (
      <View style={[styles.container, style, transparent ? {backgroundColor: 'transparent'} : false]}>
        <View style={[styles.loadingContainer, containerStyle]}>
          <ActivityIndicator isVisible={true} color={Colors.loadingColor} />
          {/* <Spinner isVisible={true} size={spinnerSize} type={spinnerType} color={Colors.loadingColor} /> */}
          {!hideText ? (
            <View style={styles.loadingText}>
              <CustomText size="large">Loading</CustomText>
            </View>
          ) : (
            false
          )}
        </View>
      </View>
    ) : (
      false
    );
  };

  render() {
    return this.getComponent();
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(85),
  },
  loadingText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default LoadingOverlay;
