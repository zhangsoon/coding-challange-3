
import { Dimensions } from "react-native";
import Helper from "./Helper";
const { width, height } = Dimensions.get("window");

// Guideline sizes are based on standard ~5" screen mobile device (Iphone 6/7 or Galaxy S8)
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const showDimension = () => console.log(`width: ${width} height: ${height}`);

const viewPortWidth = width;

const viewPortHeight = height;

const GLOBAL_HORIZONTAL_PADDING = moderateScale(15);

const GLOBAL_VERTICAL_PADDING = verticalScale(15);

const getDynamicHeight = (imgHeight, imgWidth, displayWidth) => {
  return (imgHeight / imgWidth) * displayWidth;
};

const getGlobalHeaderHeight = () => (Helper.IS_IOS ? 54 : 64);

export {
  scale,
  verticalScale,
  moderateScale,
  showDimension,
  viewPortHeight,
  viewPortWidth,
  GLOBAL_HORIZONTAL_PADDING,
  GLOBAL_VERTICAL_PADDING,
  getDynamicHeight,
  getGlobalHeaderHeight
};
