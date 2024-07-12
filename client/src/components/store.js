import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./redux/slice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
