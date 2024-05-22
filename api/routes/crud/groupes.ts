import { baseApi } from "@/api/baseApi";

const groupeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroupes: builder.query({
      query: () => "groupes",
    }),
    getGroupe: builder.query({
      query: (id: string) => `groupes/${id}`,
    }),
    createGroupe: builder.mutation({
      query: (groupe: any) => ({
        url: `groupes`,
        method: "POST",
        body: groupe,
      }),
    }),
    updateGroupe: builder.mutation({
      query: (groupe: any) => ({
        url: `groupes/${groupe.id}`,
        method: "PUT",
        body: groupe,
      }),
    }),
    deleteGroupe: builder.mutation({
      query: (id: string) => ({
        url: `groupes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGroupesQuery,
  useGetGroupeQuery,
  useCreateGroupeMutation,
  useUpdateGroupeMutation,
  useDeleteGroupeMutation,
} = groupeApi;
