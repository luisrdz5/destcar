const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DESTINY':
      return {
        ...state,
        destiny: [action.payload],
      }
    case 'SET_ORIGIN':
      return {
        ...state,
        origin: [action.payload],
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
