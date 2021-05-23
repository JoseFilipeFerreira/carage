import { combineReducers } from "redux";

import signReducers from "./reducers/sign";

const rootReducer = combineReducers({
  sign: signReducers,
});

export default rootReducer