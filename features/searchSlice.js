import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'song',
  initialState: {
    song:{},
  },
  reducers: {
    setSong: (state, action) => {
      state.song = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const {setSong}  = searchSlice.actions

export const selectSong = (state) => state.song.song

export const selectBasketItemsWithId = (state, id) => state.basket.items.filter((item) => item.id === id);

export const totalPrice = (state) =>  
    state.basket.items.reduce((total, item) => total += item.price, 0)


export default searchSlice.reducer