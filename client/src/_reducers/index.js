import { combineReducers } from "redux";
import user from "./user_reducer";

// store 내부에 여러 Reducer 존재, 각 reducer는 특정 기능 수행
// combineReducer로 root reducer에 하나로 합침
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
