const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DESTINY':
      return {
        ...state,
        destiny: [action.payload],
      };
    case 'SET_ORIGIN':
      return {
        ...state,
        origin: [action.payload],
      };
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
    case 'GET_ROUTE':
      return {
        ...state,
        route: action.payload,
      };
    case 'SET_ROUTE':
      return {
        ...state,
        from: action.payload.data.startLocation,
        to: action.payload.data.endLocation,
        route: action.payload.data.route,
        money: action.payload.data.money,
        time: action.payload.data.time,
        distance: action.payload.data.distance,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
