import { combineReducers } from "@reduxjs/toolkit";
import errorReducer from "../reducers/errorReducer";
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({ error: errorReducer, auth: authReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
