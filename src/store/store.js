import { configureStore } from '@reduxjs/toolkit'
import annonces from './annoncesSlice.js'
import users from './usersSlice.js'
import auth from './authSlice.js'
import ui from './uiSlice.js'
import favorites from './favoritesSlice.js'
import { loadState, saveState } from './persist.js'

const preloadedState = loadState()

export const store = configureStore({
  reducer: { annonces, users, auth, ui, favorites },
  preloadedState,
})

store.subscribe(() => {
  saveState(store.getState())
})
