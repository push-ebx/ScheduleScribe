import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  title: '',
  id: '',
  // current: null
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    init: (state, action) => {
      state.title = action.payload.title;
      state.id = action.payload.id;
    },
  },
})

export const {init} = projectSlice.actions

export default projectSlice.reducer