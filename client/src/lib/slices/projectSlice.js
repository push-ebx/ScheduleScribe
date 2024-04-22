import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  title: '',
  id: '',
  description: ''
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    init: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.id = action.payload.id;
    },
  },
})

export const {init} = projectSlice.actions

export default projectSlice.reducer