import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favoriteIds: [] // array of annonce IDs
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action) {
            const annonceId = action.payload
            const index = state.favoriteIds.indexOf(annonceId)
            if (index > -1) {
                // Remove from favorites
                state.favoriteIds.splice(index, 1)
            } else {
                // Add to favorites
                state.favoriteIds.push(annonceId)
            }
        },
        clearFavorites(state) {
            state.favoriteIds = []
        }
    }
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer

// Selectors
export const selectFavoriteIds = state => state.favorites.favoriteIds
export const selectIsFavorite = (state, annonceId) => state.favorites.favoriteIds.includes(annonceId)
