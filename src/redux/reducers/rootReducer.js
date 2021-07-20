import { combineReducers } from "redux"
import authenReducer from "./authen"

const rootReducer = combineReducers({
  authen: authenReducer
})

export default rootReducer
