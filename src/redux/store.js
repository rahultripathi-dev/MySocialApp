import { configureStore } from '@reduxjs/toolkit'
import notificactionSlice from './reducers/notificationSlice'
import loaderSlice from './reducers/loaderSlice'

export const store = configureStore({
  reducer:{
    notificationReducer:notificactionSlice,
    loderReducer:loaderSlice
  },
})