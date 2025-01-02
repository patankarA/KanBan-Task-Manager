import { configureStore } from '@reduxjs/toolkit'
import boardsSlice from './boardsSlice'

const store = configureStore({
  reducer: {
    // redux slice
    boards: boardsSlice.reducer,
  },
})

export default store