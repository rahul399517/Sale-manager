import { combineReducers } from "redux";
import { userReducer } from "../redux/userReducer";
export const combineReducer = combineReducers({
  user: userReducer,
});
