const initialState = {};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
    case "LOGIN_ERROR":
      return initialState;
    case "LOGOUT":
      return initialState;
    default:
      return initialState;
  }
};
