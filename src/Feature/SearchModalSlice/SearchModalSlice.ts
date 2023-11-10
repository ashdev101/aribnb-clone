import { createSlice } from '@reduxjs/toolkit'


export interface SearchModelState {
  isOpen: boolean
}

const initialState: SearchModelState = {
  isOpen: false,
}

export const SearchModalSlice = createSlice({
  name: 'SearchModal',
  initialState,
  reducers: {
    CloseSearchModal: (state) => {
      state.isOpen = false
    //   console.log("userLoginModal closed" , state.isOpen)
    },

    OpenSearchModal : (state) =>{
    
      state.isOpen = true
    //   console.log("userLoginModal opened" , state.isOpen)
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { CloseSearchModal , OpenSearchModal } = SearchModalSlice.actions

//exporting userModelReducer
export default SearchModalSlice.reducer