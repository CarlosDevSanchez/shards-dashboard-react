// Initial State
const initialState = {
  stateAuth: {},
  session: {}
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'LOGIN': {
          return {
              ...state,
              stateAuth: action.stateAuth,
          }
      }
      case 'ADD_SESSION': {
          state.session = action.user;
          return {
              ...state,
              session: action.user
          }
      }
      default: {
          return state;
      }
  }
};
export default authReducer;
