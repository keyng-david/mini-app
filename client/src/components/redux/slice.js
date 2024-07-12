import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasklist: [],
};

export const taskSlice = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    settings: (state, action) => {
      console.log(action);
      state.tasklist.push(action.payload);
    },
  },
});

export const { increment, decrement, incrementByAmount, settings } =
  taskSlice.actions;
export default taskSlice.reducer;
