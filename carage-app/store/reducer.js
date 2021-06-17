import { combineReducers } from "redux";

import signReducers from "./reducers/sign";
import userReducers from "./reducers/user";
import carReducers from "./reducers/car";
import adReducers from "./reducers/ad";

export default combineReducers({
  sign: signReducers,
  user: userReducers,
  car: carReducers,
  ad: adReducers,
});
