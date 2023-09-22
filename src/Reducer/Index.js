import { combineReducers } from "redux";
import { userListReducer } from "./Userlistreducer";
const reducers = combineReducers({
  userListData: userListReducer,
});

export default reducers;