const initialState = {
  showNavbar: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "dashboard/showNavbar": {
      return {
        ...state,
        showNavbar: true,
      };
    }
    case "dashboard/hideNavbar": {
      return {
        ...state,
        showNavbar: false,
      };
    }
    default:
      return state;
  }
}
