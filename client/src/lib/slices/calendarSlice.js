import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  id: '',
  title: '',
  description: ''
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    init: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.id = action.payload.id;
    },
  },
})

export const {init} = calendarSlice.actions

export default calendarSlice.reducer