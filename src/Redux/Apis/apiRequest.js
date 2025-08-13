


"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const apiRequest = createAsyncThunk(
  "api/request",
  async (
    { entity, url, method = "GET", data = null, headers = {} },
    { rejectWithValue }
  ) => {
    
   
    
    try {
      const response = await axios({
        //   url: `${import.meta.env.VITE_API_URL}${url}`,
        url: `${import.meta.env.VITE_API_URL}/${url}`,
        method,
        data,
        headers: {
         
          authorization: `${sessionStorage.getItem("token")}`,
          ...headers,
        },
      });
      

      if (response.status === 200 || response.status === 201) {
        if(method =="POST" ||   method == "PUT"  || method == "PATCH"  || method == "DELETE"){

          toast.success(response.data?.message)
        }
   
        
        
        return { entity, data: response.data  , success: true }; // Store API response under the correct entity
      } else {
        if (
          (response.data?.message=="Validation Error" ||response.message=="Validation Error") &&
          (response.data?.status_code === 422 ||response.status_code === 422)
         
      ) {
          const errors = errorResponse.errors;
    
          Object.entries(errors).forEach(([field, message]) => {
              toast.error(`${message}`); // or use `${field}: ${message}` if needed
          });
      } else if (errorResponse?.message) {
          toast.error(errorResponse.message);
      } else {
          toast.error("An unknown error occurred.");
      }

        if(method =="POST" ||   method == "PUT"  || method == "PATCH"  || method == "DELETE"){
          rejectWithValue(
            toast.error(response.data?.message ||response?.data?.error || response?.data?.message || response?.data?.errors || "Something went wrong")
          )
        }
        return rejectWithValue(
          // response.data?.message || "Something went wrong"
          response.data?.message || "Something went wrong"
        );
      }
    } catch (error) {
      const status = error.response?.status;
      const backendError = error.response?.data?.error ||error.response?.data?.Error || error.response?.data?.errors;
      const backendMessage = error.response?.data?.message;
      const errorMessage = status === 422 ? backendError : (backendMessage || backendError || error.message || "An error occurred");

      // Only show toast for non-GET methods
      if (method !== "GET") {
        switch (status) {
          case 400:
            toast.error(errorMessage);
            break;
          case 401:
            toast.error(errorMessage || "Unauthorized: Please login again");
            break;
          case 402:
            toast.error(errorMessage || "Payment Required");
            break;
          case 403:
            toast.error(errorMessage || "Forbidden: You don't have permission to access this resource");
            break;
          case 404:
            toast.error(errorMessage || "Not Found: The requested resource was not found");
            break;
          case 409:
            toast.error(errorMessage || "Conflict occurred");
            break;
          case 410:
            toast.error(errorMessage || "Gone: The requested resource is no longer available");
            break;
          case 422:
            toast.error(backendError || "Validation Error");
            break;
          case 500:
            toast.error(errorMessage || "Server Error: Please try again later");
            break;
          default:
            toast.error(errorMessage);
        }
      }

      return rejectWithValue({
        entity,
        error: errorMessage,
        status,
        backendError,
        backendMessage,
        success: false
      });
    }
  }
);
