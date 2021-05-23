const initialState = {
    showLogin: false,
    showRegister: false
};

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "sign/showLogin": {
      return {
        ...state,
          showLogin: !state.showLogin,
          showRegister: false,
      };
    }
    case "sign/showRegister": {
      return {
        ...state,
          showLogin: false,
          showRegister: !state.showRegister,
      };
    }
    case "sign/hideSign": {
      return {
        ...state,
          showLogin: false,
          showRegister: false,
      };
    }
    default:
      return state;
  }
}
