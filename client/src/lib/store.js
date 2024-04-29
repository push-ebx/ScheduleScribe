import {configureStore} from '@reduxjs/toolkit';
import userReducer from "@/lib/slices/userSlice";
import projectReducer from "@/lib/slices/projectSlice";
import noteboardReducer from "@/lib/slices/noteboardSlice";
import calendarReducer from "@/lib/slices/calendarSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    noteboard: noteboardReducer,
    calendar: calendarReducer
  },
})