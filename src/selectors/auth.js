import _ from "lodash";

export const getIsLogin = state => _.get(state,["isLogin"],false)
export const getUserData = state => _.get(state,["user"],null)
export const getRegisterLoading = state => _.get(state,["registerLoading"],false)
export const getRegisterStatus = state => _.get(state,["registerStatus"],false)
export const getLoginLoading = state => _.get(state,["loginLoading"],false)
export const getCurrentUser = state => _.get(state,["currentUser"],null)


// user
export const getUserDataUserName = user => _.get(user,["userName"],null)
export const getUserDataImage = user => _.get(user,["image"],null)
export const getUserDataFirstName = user => _.get(user,["firstName"],null)
export const getUserDataLastName = user => _.get(user,["lastName"],null)
export const getUserDataPassword = user => _.get(user,["password"],null)
export const getUserDataEmail = user => _.get(user,["email"],null)
export const getUserDataAge = user => _.get(user,["age"],null)
export const getUserDataHobbies = user => _.get(user,["hobbies"],null)
