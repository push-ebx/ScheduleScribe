import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  token: '',
  id: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    clear: (state) => {
      state.username = '';
      state.token = '';
      state.id = '';
    },
  },
})

export const { init, clear } = userSlice.actions

export default userSlice.reducer