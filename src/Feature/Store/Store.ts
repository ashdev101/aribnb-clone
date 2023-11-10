import { configureStore } from '@reduxjs/toolkit'
import userModelReducer from '../UserRegisterModal/UserRegisterModalSlice'
import userLoginModelReducer from '../UserLoginModal/UserLoginModal'
import AirBnbMyHomeReducer from '../AirBnbMyHome/AirbnbMyHomeSlice'
import SearchModalReducer from '../SearchModalSlice/SearchModalSlice'
export const store = configureStore({
  reducer: {
    userModal: userModelReducer ,
    userLoginModal : userLoginModelReducer ,
    AirBnbMyHomeModal : AirBnbMyHomeReducer ,
    SearchModal : SearchModalReducer
  },
})


export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch