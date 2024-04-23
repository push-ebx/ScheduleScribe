import {configureStore} from '@reduxjs/toolkit';
import userReducer from "@/lib/slices/userSlice";
import projectReducer from "@/lib/slices/projectSlice";
import noteboardReducer from "@/lib/slices/noteboardSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    noteboard: noteboardReducer
  },
})