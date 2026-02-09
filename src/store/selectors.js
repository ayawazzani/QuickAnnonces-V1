import { createSelector } from '@reduxjs/toolkit'
import { selectAllAnnonces, selectFilteredAnnonces, selectAnnonceById } from './annoncesSlice.js'

export { selectAllAnnonces, selectFilteredAnnonces, selectAnnonceById }

export const selectUsers = state => state.users.items
export const selectAuth = state => state.auth

export const selectAuthUser = createSelector(
  [selectUsers, selectAuth],
  (users, auth) => users.find(u=>u.id===auth.currentUserId) || null
)

export const selectIsAdmin = createSelector(
  [selectAuthUser],
  (user) => !!user && user.role === 'admin'
)
