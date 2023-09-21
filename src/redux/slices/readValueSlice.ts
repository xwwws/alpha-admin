import { createSlice } from '@reduxjs/toolkit'


const readValueSlice = createSlice({
  name: 'readValue',
  initialState: {
    readXAxis: [],
    readSeries: [],

  },
  reducers: {
    setReadXAxis(state, action) {
      state.readXAxis = action.payload
    },
    setReadSeries(state, action) {
      state.readSeries = action.payload
    }
  }
})
export const {
  setReadXAxis,
  setReadSeries,
} = readValueSlice.actions

export default readValueSlice.reducer

