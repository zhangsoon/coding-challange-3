import {Platform, Dimensions} from 'react-native';
import _ from 'lodash';

const IS_ANDROID = Platform.OS === 'android';

const IS_IOS = Platform.OS === 'ios';

const chunkArray = (myArray, chunk_size) => {
  if (_.isEmpty(myArray)) {
    return null;
  }

  let arrayLength = myArray.length;
  let tempArray = [];

  for (let index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size);

    tempArray.push(myChunk);
  }

  return tempArray;
};

const isIphoneX = () => {
  let d = Dimensions.get('window');
  const {height, width} = d;

  return Platform.OS === 'ios' && (height === 812 || width === 812 || (height === 896 || width === 896));
};

const formatToDatePicker = date => {
  let month = date.getMonth() + 1;

  let day = date.getDate();

  let year = date.getFullYear();

  if (day.length < 2) day = '0' + day;

  return [day, month, year].join(' ');
};

const validateEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default {
  IS_ANDROID,
  IS_IOS,
  chunkArray,
  isIphoneX,
  formatToDatePicker,
  validateEmail
};
