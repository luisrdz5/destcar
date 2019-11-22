export const setDestiny = ((payload) => {
  type: 'SET_DESTINY',
  payload;
});
export const setOrigin = ((payload) => {
  type: 'SET_ORIGIN',
  payload;
});
export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});
export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});
export const registerRequest = (payload) => ({
  type: 'REGISTER_REQUEST',
  payload,
});
export const getRoute = (payload) => ({
  type: 'GET_ROUTE',
  payload,
});
