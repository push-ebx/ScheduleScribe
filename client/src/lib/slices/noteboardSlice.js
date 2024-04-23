import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  title: '',
  id: '',
  description: ''
}

export const noteboardSlice = createSlice({
  name: 'noteboard',
  initialState,
  reducers: {
    init: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.id = action.payload.id;
    },
  },
})

export const {init} = noteboardSlice.actions

export default noteboardSlice.reducer