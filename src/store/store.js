import { configureStore } from '@reduxjs/toolkit'
import filmsSlice from '../components/Films/filmsSlice'
import planetsSlice from '../components/Planets/planetsSlice'
import residentsSlice from '../components/Residents/residentsSlice'

export const store = configureStore({
  reducer: {
    planets: planetsSlice,
    residents: residentsSlice,
    films:filmsSlice
  }
})