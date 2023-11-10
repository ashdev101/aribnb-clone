import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

export interface UserLoginModelState {
  isOpen: boolean
}

const initialState: UserLoginModelState = {
  isOpen: false,
}

export const UserLoginModelSlice = createSlice({
  name: 'userLoginModal',
  initialState,
  reducers: {
    CloseUserLoginModal: (state) => {
      state.isOpen = false
      // console.log("userLoginModal closed" , state.isOpen)
    },

    OpenUserLoginModal : (state) =>{
    
      state.isOpen = true
      // console.log("userLoginModal opened" , state.isOpen)
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { CloseUserLoginModal , OpenUserLoginModal } = UserLoginModelSlice.actions

//exporting userModelReducer
export default UserLoginModelSlice.reducer