import { configureStore } from '@reduxjs/toolkit'
import candidate_reducer from './slices/CandidateSlice'

export const store = configureStore({
  reducer: {
    candidates: candidate_reducer 
  }
})

// Get the type of our store variable

export type AppStore = typeof store

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']