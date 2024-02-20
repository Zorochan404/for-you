import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'song',
  initialState: {
    song:{
      url: null,
      title: null,
      thumbnail: null,
      uploaderName: null,
      uploaderUrl: null,
      duration: null,
      },
  },
  reducers: {
    setSong: (state, action) => {
        state.song= action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const setSong = (songData) => {
  return searchSlice.actions.setSong(songData);
};
export const selectSong = (state) => state.song.song

export const selectBasketItemsWithId = (state, id) => state.basket.items.filter((item) => item.id === id);

export const totalPrice = (state) =>  
    state.basket.items.reduce((total, item) => total += item.price, 0)


export default searchSlice.reducer