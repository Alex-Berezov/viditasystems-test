import { combineReducers } from "redux"
import { docsReducers } from "./docsReducers"


export const rootReducer = combineReducers({
  docs: docsReducers
})

export type RootState = ReturnType<typeof rootReducer>