import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserModelState {
  isOpen: boolean
}

const initialState: UserModelState = {
  isOpen: false,
}

export const UserModelSlice = createSlice({
  name: 'userModal',
  initialState,
  reducers: {
    CloseUserModal: (state) => {
      state.isOpen = false
    },

    OpenUserModal : (state) =>{
      // console.log('all set')
      state.isOpen = true
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { CloseUserModal , OpenUserModal } = UserModelSlice.actions

//exporting userModelReducer
export default UserModelSlice.reducer