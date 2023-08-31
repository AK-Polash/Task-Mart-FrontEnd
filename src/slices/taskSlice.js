import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  
  initialState: {
    taskInfo: null,
  },

  reducers: {
    assignedTask: (state, action) => {
      state.taskInfo = action.payload;
    },
  },
});

export const { assignedTask } = taskSlice.actions;
export default taskSlice.reducer;
