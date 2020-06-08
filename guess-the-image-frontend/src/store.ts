import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import rootReducer, { RootState } from "./reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export default store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
