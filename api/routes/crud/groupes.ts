import { baseApi } from "@/api/baseApi";

const groupeApi: any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroupes: builder.query({
      query: () => "list-equipes",
      transformResponse: (response: any) => response.equipes,
      providesTags: ["groupe"],
    }),
    getGroupe: builder.query({
      query: (id: string) => `equipe-Infos/${id}`,
      transformResponse: (response: any) => response.equipe,
    }),
    createGroupe: builder.mutation({
      query: (groupe: any) => ({
        url: `createequipe`,
        method: "POST",
        body: groupe,
      }),
      invalidatesTags: ["groupe"],
    }),
    updateGroupe: builder.mutation({
      query: (groupe: any) => ({
        url: `update-equipe/${groupe.id}`,
        method: "PUT",
        body: groupe,
      }),
      invalidatesTags: ["groupe"],
    }),
    deleteGroupe: builder.mutation({
      query: (id: string) => ({
        url: `groupes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["groupe"],
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
