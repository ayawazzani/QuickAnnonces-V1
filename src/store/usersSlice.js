import { createSlice, nanoid } from '@reduxjs/toolkit'
import { seedUsers } from '../data/seed.js'

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: seedUsers },
  reducers: {
    registerUser: {
      reducer(state, action) {
        state.items.push(action.payload)
      },
      prepare(data) {
        return { payload: { id: data.id || nanoid(), ...data, role: data.role || 'user' } }
      }
    },
    deleteUser(state, action) {
      const id = action.payload
      state.items = state.items.filter(u => u.id !== id)
    }
  }
})

export const { registerUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer
