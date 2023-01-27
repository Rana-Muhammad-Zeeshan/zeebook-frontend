import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const userSlice = createSlice({
  name: 'user-slice',
  initialState: {
    value: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  },
  reducers: {
    saveUserInCookies: (state, payload) => {
      state.value = payload
    },
  },
})

export const { saveUserInCookies } = userSlice.actions

export default userSlice
