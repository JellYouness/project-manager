import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["task", "etudiant", "enseignant", "sujet", "groupe"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      const token = store.getState().auth.token || localStorage.getItem("token");

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

interface User{
  id: string;
  username: string;
  token: string;
  type: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// third-party
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

const { dispatch } = store;
// setupListeners(store.dispatch);
export { store, dispatch };


// Get the current state of the store

