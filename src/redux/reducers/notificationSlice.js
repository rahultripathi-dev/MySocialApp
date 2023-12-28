import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isVisible: false,
  notificationData:"",
  notificactionListingData:[]
}

export const notificactionSlice = createSlice({
  name: 'notificactionSlice',
  initialState,
  reducers: {
    onGetNotification:  (state, action)=> {
      state.isVisible =!!action.payload?true:false,
      state.notificationData=action.payload
    },
    gettingNotificationData: (state, action)=> {
      state.notificactionListingData=action.payload
      // console.log(state, "insideReducer")

    }
  },
})

// Action creators are generated for each case reducer function
export const { onGetNotification,gettingNotificationData } = notificactionSlice.actions

export default notificactionSlice.reducer