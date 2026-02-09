import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { currentUserId: null, isAdmin: false },
  reducers: {
    login(state, action){
      state.currentUserId = action.payload.userId
      state.isAdmin = action.payload.isAdmin || false
    },
    logout(state){
      state.currentUserId = null
      state.isAdmin = false
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
