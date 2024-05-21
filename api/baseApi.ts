import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [""],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: () => ({}),
});
