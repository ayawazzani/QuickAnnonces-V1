import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit'
import { seedAnnonces } from '../data/seed.js'

const initialState = {
  items: seedAnnonces,
  filters: {
    keyword: '',
    categorieId: '',
    sousCategorieId: '',
    typeAnnonce: '',
    prixMin: '',
    prixMax: '',
    ville: '',
    sortBy: 'date', // 'date' | 'prix'
    sortDir: 'desc', // 'asc' | 'desc'
  },
}

const annoncesSlice = createSlice({
  name: 'annonces',
  initialState,
  reducers: {
    addAnnonce: {
      reducer(state, action){
        state.items.push(action.payload)
      },
      prepare(data){
        const now = new Date().toISOString()
        return {
          payload: {
            id: nanoid(),
            titre: data.titre,
            description: data.description,
            typeAnnonce: data.typeAnnonce,
            categorieId: data.categorieId,
            sousCategorieId: data.sousCategorieId || '',
            marque: data.marque || '',
            annee: data.annee || null,
            prix: Number(data.prix || 0),
            ville: data.ville || '',
            photos: data.photos || [],
            datePoster: now,
            userId: data.userId,
            etat: 'en_attente',
          }
        }
      }
    },
    updateEtat(state, action){
      const { id, etat } = action.payload
      const a = state.items.find(x=>x.id===id)
      if (a) a.etat = etat
    },
    deleteAnnonce(state, action){
      const id = action.payload
      state.items = state.items.filter(x=>x.id!==id)
    },
    deleteAnnoncesByUser(state, action){
      const userId = action.payload
      state.items = state.items.filter(x=>x.userId !== userId)
    },
    setFilters(state, action){
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters(state){
      state.filters = initialState.filters
    }
  }
})

export const { addAnnonce, updateEtat, deleteAnnonce, deleteAnnoncesByUser, setFilters, resetFilters } = annoncesSlice.actions

export default annoncesSlice.reducer

// selectors
export const selectAllAnnonces = state => state.annonces.items
export const selectAnnonceById = (state, id) => state.annonces.items.find(a=>a.id===id)

const selectFilters = state => state.annonces.filters

export const selectFilteredAnnonces = createSelector(
  [selectAllAnnonces, selectFilters],
  (items, filters) => {
    let res = items
    if (filters.keyword) {
      const k = filters.keyword.toLowerCase()
      res = res.filter(a =>
        a.titre.toLowerCase().includes(k) || (a.description||'').toLowerCase().includes(k)
      )
    }
    if (filters.categorieId) res = res.filter(a => a.categorieId === filters.categorieId)
    if (filters.sousCategorieId) res = res.filter(a => a.sousCategorieId === filters.sousCategorieId)
    if (filters.typeAnnonce) res = res.filter(a => a.typeAnnonce === filters.typeAnnonce)
    if (filters.ville) res = res.filter(a => a.ville.toLowerCase().includes(filters.ville.toLowerCase()))
    if (filters.prixMin !== '' && filters.prixMin != null) res = res.filter(a => Number(a.prix) >= Number(filters.prixMin))
    if (filters.prixMax !== '' && filters.prixMax != null) res = res.filter(a => Number(a.prix) <= Number(filters.prixMax))

    if (filters.sortBy === 'prix') {
      res = [...res].sort((a,b)=> (Number(a.prix)-Number(b.prix)) * (filters.sortDir==='asc'?1:-1))
    } else {
      res = [...res].sort((a,b)=> (new Date(a.datePoster) - new Date(b.datePoster)) * (filters.sortDir==='asc'?1:-1))
    }
    return res
  }
)
