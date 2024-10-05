import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  select_api: {
    url: "",
    method: "GET",
  },
};

const cacheSlice = createSlice({
  name: "cache",
  initialState: initialState,
  reducers: {
    addToCache(state, action) {
      state[action.payload.key] = action.payload.body;
    },
    getResponse(state, action) {
      const index = state.findIndex(
        (item) => item.name === action.payload.name
      );
      state[index].response = action.payload.response;
    },
  },
});

export const { addToCache, getResponse } = cacheSlice.actions;
export default cacheSlice.reducer;
