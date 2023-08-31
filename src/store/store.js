import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import taskSlice from "../slices/taskSlice";

export default configureStore({
  reducer: {
    userData: userSlice,
    taskData: taskSlice,
  },
});
