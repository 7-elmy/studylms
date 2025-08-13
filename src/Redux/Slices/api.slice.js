import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../Apis/apiRequest";


const apiSlice = createSlice({
  name: "api",
  initialState: {
   
  },
  reducers: {
    clearApiError: (state, action) => {
      const entity = action.payload;
      if (state[entity]) {
        state[entity].error = null;
      }
    },
  }, // No reducers needed since we're handling everything in `extraReducers`
  extraReducers: (builder) => {
    builder
      .addCase(apiRequest.pending, (state, action) => {
        const { entity } = action.meta.arg;
        state[entity].loading = true;
        state[entity].error = null;
      })
      .addCase(apiRequest.fulfilled, (state, action) => {
        const { entity, data } = action.payload;
        state[entity].loading = false;
        state[entity].data = data;
      })
      .addCase(apiRequest.rejected, (state, action) => {
        console.log({ reject: action.payload.error });
        // toast.error(action.payload.error)

        const { entity } = action.payload;
        state[entity].loading = false;
        state[entity].error = action.payload.error;
      });
  },
});

export let apiReducer = apiSlice.reducer;
export const { clearApiError } = apiSlice.actions;
