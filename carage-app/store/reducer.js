import { combineReducers } from "redux";

import signReducers from "./reducers/sign";
import userReducers from "./reducers/user";
import carReducers from "./reducers/car";

export default combineReducers({
  sign: signReducers,
  user: userReducers,
  car: carReducers,
});
