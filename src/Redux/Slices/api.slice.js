import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../Apis/apiRequest";


const apiSlice = createSlice({
  name: "api",
  initialState: {
  countries:{ data: null, loading: false, error: null },
  register:{ data: null, loading: false, error: null },
  profile:{ data: null, loading: false, error: null },
  login:{ data: null, loading: false, error: null },
  sendOTP:{data: null, loading: false, error: null},
  resendotpforgetpassword:{data: null , loading: false, error: null},
  verifycodeforgetpassword:{data: null , loading: false, error: null},
  resetPassword:{data: null , loading: false, error: null},
  verify:{data: null, loading: false, error: null},
  about:{data: null, loading: false, error: null},
  contactus:{data: null, loading: false, error: null},
  terms:{data: null, loading: false, error: null},
  privacy:{data: null, loading: false, error: null},
  logout:{data: null, loading: false, error: null},
  categories:{data: null, loading: false, error: null},
  Packages:{data: null, loading: false, error: null},
  updateProfile:{data: null, loading: false, error: null},
  courses:{data: null, loading: false, error: null},
  subscription:{data: null, loading: false, error: null},
  },
  reducers: {
    clearApiError: (state, action) => {
      const entity = action.payload;
      if (state[entity]) {
        state[entity].error = null;
      }
    },
  },
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
        //console.log({ reject: action.payload.error });
        // toast.error(action.payload.error)

        const { entity } = action.payload;
        state[entity].loading = false;
        state[entity].error = action.payload.error;
      });
  },
});

export let apiReducer = apiSlice.reducer;
export const { clearApiError } = apiSlice.actions;
