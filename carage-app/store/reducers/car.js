const initialState = {
  showSell: false,
  showShare: false,
  showMaintenance: false,
};

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "car/showSell": {
      return {
        ...state,
        showSell: true,
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
      };
    }
    case "car/hideShare": {
      return {
        ...state,
        showShare: false,
      };
    }
    case "car/showMaintenance": {
      return {
        ...state,
        showMaintenance: true,
      };
    }
    case "car/hideMaintenance": {
      return {
        ...state,
        showMaintenance: false,
      };
    }
    default:
      return state;
  }
}
