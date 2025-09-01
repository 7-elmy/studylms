



"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Helper function to show backend errors
function showBackendErrors(backendError, fallbackMessage) {
  if (backendError && typeof backendError === "object") {
    Object.values(backendError).forEach(messages => {
      if (Array.isArray(messages)) {
        messages.forEach(msg => toast.error(msg));
      } else {
        toast.error(messages);
      }
    });
  } else {
    toast.error(fallbackMessage);
  }
}

export const apiRequest = createAsyncThunk(
  "api/request",
  async (
    { entity, url, method = "GET", data = null, headers = {} },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/${url}`,
        method,
        data,
        headers: {
          authorization: `${sessionStorage.getItem("token")}`,
        
          ...headers,
        },
      });

      // Success
      if ([200, 201].includes(response.status)) {
        if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
          toast.success(response.data?.message,  {
       icon: '👏'});
        }
        return { entity, data: response.data, success: true };
      }

      // Non-200/201 (unlikely here, but just in case)
      toast.error(response.data?.message || "Something went wrong");
      return rejectWithValue(response.data?.message || "Something went wrong");

    } catch (error) {
      const status = error.response?.status;
      const backendError =
        error.response?.data?.error ||
        error.response?.data?.Error ||
        error.response?.data?.errors;

      const backendMessage = error.response?.data?.message;
      const errorMessage =
        backendMessage || backendError || error.message || "An error occurred";

      // Only show toast for non-GET requests
      if (method !== "GET") {
        switch (status) {
          case 400:
          case 401:
          case 402:
          case 403:
          case 404:
          case 409:
          case 410:
          case 422:
            showBackendErrors(backendError, errorMessage);
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
        success: false,
      });
    }
  }
);



// "use client";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import toast from "react-hot-toast";

// const showBackendErrors = (backendError, fallback) => {
//   if (backendError && typeof backendError === "object") {
//     Object.values(backendError).forEach(messages => {
//       messages.forEach(msg => toast.error(msg));
//     });
//   } else {
//     toast.error(fallback);
//   }
// };

// export const apiRequest = createAsyncThunk(
//   "api/request",
//   async ({ entity, url, method = "GET", data = null, headers = {} }, { rejectWithValue }) => {
//     try {
//       const response = await axios({
//         url: `${import.meta.env.VITE_API_URL}/${url}`,
//         method,
//         data,
//         headers: {
//           authorization: `${sessionStorage.getItem("token")}`,
//           ...headers,
//         },
//       });

//       if ([200, 201].includes(response.status)) {
//         if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
//           toast.success(response.data?.message || "Success");
//         }
//         return { entity, data: response.data, success: true };
//       }

//       const errors = response.data?.errors;
//       if (errors) {
//         Object.values(errors).forEach(msgs => msgs.forEach(msg => toast.error(msg)));
//       } else {
//         toast.error(response.data?.message || "Something went wrong");
//       }

//       return rejectWithValue({ entity, error: response.data?.message, success: false });

//     } catch (error) {
//       const status = error.response?.status;
//       const backendError = error.response?.data?.error || error.response?.data?.Error || error.response?.data?.errors;
//       const backendMessage = error.response?.data?.message;
//       const errorMessage = backendMessage || backendError || error.message || "An error occurred";

//       if (method !== "GET") {
//         switch (status) {
//           case 400: case 401: case 402: case 403:
//           case 404: case 409: case 410: case 422:
//             showBackendErrors(backendError, errorMessage);
//             break;
//           case 500:
//             toast.error(errorMessage || "Server Error: Please try again later");
//             break;
//           default:
//             toast.error(errorMessage);
//         }
//       }

//       return rejectWithValue({ entity, error: errorMessage, status, success: false });
//     }
//   }
// );
