import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    loading: false,
  };

const residentsSlice = createSlice({
  name: 'residents',
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

export const { dataState , dataLoadingState} = residentsSlice.actions
export default residentsSlice.reducer