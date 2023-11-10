import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

export interface AirBnbMyHomeModelState {
  isOpen: boolean
}

const initialState: AirBnbMyHomeModelState = {
  isOpen: false,
}

export const AirBnbMyHomeModelSlice = createSlice({
  name: 'AirBnbMyHomeModal',
  initialState,
  reducers: {
    CloseAirBnbMyHomeModal: (state) => {
      state.isOpen = false
    //   console.log("userLoginModal closed" , state.isOpen)
    },

    OpenAirBnbMyHomeModal : (state) =>{
    
      state.isOpen = true
    //   console.log("userLoginModal opened" , state.isOpen)
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { CloseAirBnbMyHomeModal , OpenAirBnbMyHomeModal } = AirBnbMyHomeModelSlice.actions

//exporting userModelReducer
export default AirBnbMyHomeModelSlice.reducer