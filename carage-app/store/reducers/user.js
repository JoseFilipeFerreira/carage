const initialState = {
    token: ''
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "user/storeToken": {
        console.log(action)
      return {
        ...state,
          token: action.token,
      };
    }
    case "user/removeToken": {
      console.log(action)
    return {
      ...state,
        token: null,
    };
  }
    default:
      return state;
  }
}
