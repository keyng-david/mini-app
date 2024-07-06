import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./container/score/slice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
