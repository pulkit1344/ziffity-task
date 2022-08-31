import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    loading: false,
  };

const planetsSlice = createSlice({
  name: 'planets',
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

export const { dataState , dataLoadingState} = planetsSlice.actions
export default planetsSlice.reducer