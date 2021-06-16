const initialState = {
  showSell: false,
  showShare: false,
};

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "car/showSell": {
      return {
        ...state,
        showSell: true,
        showShare: false,
      };
    }
    case "car/hideSell": {
      return {
        ...state,
        showSell: false,
      };
    }
    case "car/showShare": {
      return {
        ...state,
        showShare: true,
        showSell: false,
      };
    }
    case "car/hideShare": {
      return {
        ...state,
        showShare: false,
      };
    }
    default:
      return state;
  }
}
