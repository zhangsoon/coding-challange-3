export const loginAccountRequest = (userName, password) => ({
  type: 'auth/LOGIN_ACCOUNT_REQUEST',
  userName,
  password,
});

export const loginAccountSuccess = user => ({
  type: 'LOGIN_ACCOUNT_SUCCESS',
  user,
});

export const loginAccountFailure = () => ({
  type: 'LOGIN_ACCOUNT_FAILURE',
});

export const logoutRequest = () => ({
  type: 'auth/LOGOUT_REQUEST',
});

export const logoutSuccess = () => ({
  type: 'LOG_OUT_SUCCESS',
});

export const registerNewUserRequest = data => ({
  type: 'auth/REGISTER_NEW_USER_REQUEST',
  data,
});

export const registerNewUserSuccess = () => ({
  type: 'REGISTER_NEW_USER_SUCCESS',
});
