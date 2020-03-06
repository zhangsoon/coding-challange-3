
import AsyncStorage from "@react-native-community/async-storage";

/**
 *
 * @type {string}
 */
const AUTHENTICATION_TOKEN = "loginToken";


/**
 * To set user token
 */
async function setToken() {
  try {
    await AsyncStorage.setItem(AUTHENTICATION_TOKEN, "true");
  } catch (error) {
    // Error saving data
  }
}

/**
 * To remove user token
 */
async function removeToken() {
  try {
    await AsyncStorage.removeItem(AUTHENTICATION_TOKEN);
  } catch (error) {
    // Error saving data
  }
}

/**
 * To get unit token
 */
async function retrieveToken() {
  try {
    return await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
  } catch (error) {
    // Error saving data
  }
}


export default {
  setToken,
  removeToken,
  retrieveToken
};
