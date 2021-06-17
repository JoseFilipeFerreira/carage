const initialState = {
  showEmail: false,
  showPhone: false,
};

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "ad/showEmail": {
      return {
        ...state,
        showEmail: true,
      };
    }
    case "ad/hideEmail": {
      return {
        ...state,
        showEmail: false,
      };
    }
    case "ad/showPhone": {
      return {
        ...state,
        showPhone: true,
      };
    }
    case "ad/hidePhone": {
      return {
        ...state,
        showPhone: false,
      };
    }
    default:
      return state;
  }
}
