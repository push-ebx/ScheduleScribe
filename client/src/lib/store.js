import {configureStore} from '@reduxjs/toolkit';
import userReducer from "@/lib/slices/userSlice";
import projectReducer from "@/lib/slices/projectSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer
  },
})