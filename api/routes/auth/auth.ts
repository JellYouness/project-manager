import { baseApi } from "@/api/baseApi";

interface AuthResponse {
  id: string;
  username: string;
  token: string;
  type: string;
}

const authApi: any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: AuthResponse) => {
        const { id, username, token, type } = response;
        return { id, username, token, type };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Store the token and user info in the Redux state or localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data));
        } catch (err) {
          console.error("Login failed: ", err);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
