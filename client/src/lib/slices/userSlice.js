import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  token: '',
  id: '',
  url: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.url = action.payload.url;
    },
    clear: (state) => {
      state.username = '';
      state.token = '';
      state.id = '';
      state.url = '';
    },
  },
})

export const { init, clear } = userSlice.actions

export default userSlice.reducer