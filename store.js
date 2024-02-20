import { configureStore } from '@reduxjs/toolkit'
import songReducer from "./features/searchSlice"
import playlistReducer from "./features/playlistSlice"


export default configureStore({
  reducer: {
    song: songReducer,
    playlist: playlistReducer,
  }
})