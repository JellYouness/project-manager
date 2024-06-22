import { authSlice, baseApi, dispatch } from "@/api/baseApi";
import { enqueueSnackbar } from "notistack";

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
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Store the token and user info in the Redux state or localStorage
          if (data) {
            const { token } = data;
            // Assuming you have an authSlice with token and user states
            dispatch(authSlice.actions.setToken(token));
            dispatch(authSlice.actions.setUser(data));
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(data));
            enqueueSnackbar("Login successful", { variant: "success" });
          }
        } catch (err) {
          console.error("Login failed: ", err);
          enqueueSnackbar(`Login failed: ${err}`, { variant: "error" });
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
