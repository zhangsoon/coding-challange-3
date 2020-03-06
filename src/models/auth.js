import Immutable from 'seamless-immutable';
import AuthManager from '../utils/AuthManager';
import NavigationService from '../navigation/NavigationService';
import {NavigationActions} from 'react-navigation';
import * as authAction from '../actions/auth';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';
import * as selectors from '../selectors';
import Toast from '../utils/Toast';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default () => {
  function* watcherRegisterNewUserRequest({payload}, effects) {
    const {put, call, delay} = effects;
    try {
      yield wait(1500);
      yield put(authAction.registerNewUserSuccess());
    } catch (e) {
      console.log(e);
    }
  }

  function* watcherLoginAccountRequest({userName, password}, effects) {
    const {put, select} = effects;
    try {
      yield wait(1500);
      const user = yield select(selectors.getUserData);
      if (_.isEmpty(user)) {
        Toast.error('Your login is fail.Please try again.');
        yield put(authAction.loginAccountFailure());
      } else {
        let targetUser = _.find(user, item => {
          const targetUserName = _.get(item, ['userName'], null);
          const targetPassword = _.get(item, ['password'], null);
          return (
            _.isEqual(targetUserName.toLowerCase(), userName.toLowerCase()) &&
            _.isEqual(targetPassword, password)
          );
        });
        if (!_.isEmpty(targetUser)) {
          Toast.success('You have login successfully');
          yield put(authAction.loginAccountSuccess(targetUser));
          AuthManager.setToken().then(() => {});
          NavigationService.navigate('MainScreen');
        } else {
          Toast.error('Your login is fail.Please try again.');
          yield put(authAction.loginAccountFailure());
        }
      }
    } catch (e) {
      console.log(e);
      yield put(authAction.loginAccountFailure());
    }
  }

  function* watcherLogoutRequest({payload}, effects) {
    const {put, call, delay} = effects;
    try {
      yield put(authAction.logoutSuccess());
      AuthManager.removeToken().then(() => {});
      NavigationService.navigate('Login');
    } catch (e) {
      console.log(e);
    }
  }

  const INITIAL_STATE = Immutable({
    isLogin: false,
    user: [],
  });

  return {
    namespace: 'auth',
    state: INITIAL_STATE,
    reducers: {
      LOGIN_ACCOUNT_REQUEST(state, action) {
        return state.setIn(['loginLoading'], true);
      },
      LOGIN_ACCOUNT_SUCCESS(state, action) {
        return state.setIn(['loginLoading'], false).setIn(['currentUser'], action.user);
      },
      LOGIN_ACCOUNT_FAILURE(state) {
        return state.setIn(['loginLoading'], false);
      },
      REGISTER_NEW_USER_REQUEST(state, action) {
        let {user} = state;
        let newUserData = !_.isEmpty(user) ? user.concat([action.data]) : [action.data];

        return state
          .setIn(['user'], newUserData)
          .setIn(['registerLoading'], true)
          .setIn(['registerStatus'], false);
      },
      REGISTER_NEW_USER_SUCCESS(state) {
        return state.setIn(['registerLoading'], false).setIn(['registerStatus'], true);
      },
      LOG_OUT_SUCCESS(state) {
        return state.setIn(['currentUser'], null);
      },
    },
    effects: {
      REGISTER_NEW_USER_REQUEST: [watcherRegisterNewUserRequest],
      LOGIN_ACCOUNT_REQUEST: [watcherLoginAccountRequest],
      LOGOUT_REQUEST: [watcherLogoutRequest],
    },
  };
};
