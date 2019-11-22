import axios from 'axios';

export const setDestiny = (payload) => ({
  type: 'SET_DESTINY',
  payload,
});
export const setOrigin = (payload) => ({
  type: 'SET_ORIGIN',
  payload,
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
export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});
export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => {
        document.cookie = `email=${data.user.userEmail}`;
        document.cookie = `name=${data.user.userName}`;
        document.cookie = `id=${data.user.id}`;
        document.cookie = `token=${data.token}`;

        dispatch(registerRequest(data));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};
export const loginUser = ({ email, password, rememberMe }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
      data: {
        rememberMe,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.email}`;
        document.cookie = `name=${data.name}`;
        document.cookie = `id=${data.id}`;
        dispatch(loginRequest(data));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};
export const logoutUser = (payload) => {
  return (dispatch) => {
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    dispatch(logoutRequest(payload));
  };
};
