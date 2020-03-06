
import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity,Image } from "react-native";
import Helper from "../../../utils/Helper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { moderateScale, verticalScale } from "../../../utils/Scaling";
import CustomText from "../CustomText";
import Colors from "../../../utils/Color";
import { connect } from "dva";
import { SafeAreaView } from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class CustomHeaderComponent extends PureComponent {
    onPressLeft = () => {
        const { onPressLeft } = this.props;

        onPressLeft && onPressLeft();
    };

    onPressRight = () => {
        const { onPressRight } = this.props;

        onPressRight && onPressRight();
    };

    getRightIcon = () => {
        const { rightIconFamily, rightIcon, rightIconSize = 30 } = this.props;

        switch (rightIconFamily) {
            case "MaterialCommunityIcons":
                return <MaterialCommunityIcons name={rightIcon} size={rightIconSize} color="black" />;
            case "FontAwesome":
                return <FontAwesome name={rightIcon} size={rightIconSize} color="black" />;
            default:
                return <Ionicons name={rightIcon} size={rightIconSize} color="black" />;
        }
    };

    render() {
        const {
            children,
            leftIcon,
            hideLeftIcon = false,
            leftImage,
            rightImage,
            rightText,
            rightIcon,
            title,
            isConnected,
            size = "large",
            rightTextStyle,
            hideRightIcon = false
        } = this.props;
        return (
            <SafeAreaView style={[styles.container, { paddingTop: isConnected ? (Helper.IS_IOS ? 20 : 0) : 0 }]}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeftContainer}>
                        {!hideLeftIcon ? (
                            <TouchableOpacity style={styles.leftButton} activeOpacity={0.6} onPress={this.onPressLeft}>
                                {leftImage ? (
                                    <Image source={leftImage} style={styles.imageStyle} />
                                ) : (
                                    <Ionicons name={leftIcon ? leftIcon : "md-close"} size={30} color="black" />
                                )}
                            </TouchableOpacity>
                        ) : (
                            false
                        )}
                    </View>
                    <View style={styles.headerMiddleContainer}>
                        {title ? (
                            <CustomText size="large" style={{ fontWeight: "500" }}>
                                {title}
                            </CustomText>
                        ) : (
                            false
                        )}
                    </View>
                    <View style={styles.headerRightContainer}>
                        {hideRightIcon ? (
                            false
                        ) : (
                            <TouchableOpacity style={styles.rightButton} activeOpacity={0.6} onPress={this.onPressRight}>
                                {!rightText && !rightImage && !rightIcon ? (
                                    false
                                ) : rightText ? (
                                    <CustomText size={size} style={[styles.rightTextStyle, rightTextStyle]}>
                                        {rightText}
                                    </CustomText>
                                ) : rightImage ? (
                                    <CustomImage source={rightImage} style={styles.imageStyle} />
                                ) : (
                                    this.getRightIcon()
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={{ flex: 1 }}>{children}</View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        paddingTop: Helper.IS_IOS ? (Helper.isIphoneX() ? 0 : 20) : 0
    },
    headerContainer: {
        maxHeight: Helper.IS_IOS ? 54 : 64,
        minHeight: Helper.IS_IOS ? 54 : 64,
        alignItems: "center",
        flexDirection: "row",
        flex: 1
    },
    headerLeftContainer: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingLeft: moderateScale(15)
    },
    headerMiddleContainer: {
        flex: 2,
        justifyContent: "center",
        flexDirection: "row"
    },
    headerRightContainer: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
        paddingRight: moderateScale(15)
    },
    imageStyle: {
        height: 30,
        width: 30
    },
    leftButton: {
        paddingRight: moderateScale(8),
        paddingVertical: verticalScale(3)
    },
    rightButton: {
        paddingLeft: moderateScale(8),
        paddingVertical: verticalScale(3)
    },
    rightTextStyle: {
        color: Colors.primaryThemeColor,
        fontWeight: "bold",
        textAlign: "center"
    }
});

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomHeaderComponent);
