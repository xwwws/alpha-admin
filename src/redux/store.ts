import { configureStore } from '@reduxjs/toolkit'
import readValueSlice from "./slices/readValueSlice";

const store = configureStore({
  reducer: {
    readValue: readValueSlice,
  },
  // 关闭序列化
  // middleware: getDefaultMiddleware => getDefaultMiddleware({
  //   serializableCheck: false
  // })
})
export default store
