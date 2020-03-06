import _ from 'lodash';
import * as fromGlobal from './global';
import * as fromAuth from './auth';

//global
export const getIsRehydrationCompleted = state => fromGlobal.getIsRehydrationCompleted(state.global);

//auth
export const getIsLogin = state => fromAuth.getIsLogin(state.auth);
export const getUserData = state => fromAuth.getUserData(state.auth);
export const getRegisterLoading =state => fromAuth.getRegisterLoading(state.auth)
export const getRegisterStatus = state => fromAuth.getRegisterStatus(state.auth)
export const getLoginLoading = state => fromAuth.getLoginLoading(state.auth)
export const getCurrentUser = state => fromAuth.getCurrentUser(state.auth)
