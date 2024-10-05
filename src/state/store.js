import { configureStore } from "@reduxjs/toolkit";
import cacheReducer from "./cacheSlice";

export const store = configureStore({
  reducer: {
    cache: cacheReducer,
  },
});
