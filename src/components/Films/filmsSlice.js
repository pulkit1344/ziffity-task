import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    loading: false,
  };

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    dataState(state, action) {
      state.items = action.payload
    },
    dataLoadingState(state,action) {
      state.loading = action.payload
    },
  }
})

export const { dataState , dataLoadingState} = filmsSlice.actions
export default filmsSlice.reducer