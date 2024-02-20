import { configureStore } from '@reduxjs/toolkit'
import songReducer from "./features/searchSlice"

export default configureStore({
  reducer: {
    song: songReducer,
  }
})