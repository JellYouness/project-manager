import { baseApi } from "@/api/baseApi";

const enseignantApi: any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnseignants: builder.query({
      query: () => "enseignants",
    }),
    getEnseignant: builder.query({
      query: (id: string) => `enseignants/${id}`,
    }),
    createEnseignant: builder.mutation({
      query: (enseignant: any) => ({
        url: `enseignants`,
        method: "POST",
        body: enseignant,
      }),
    }),
    updateEnseignant: builder.mutation({
      query: (enseignant: any) => ({
        url: `enseignants/${enseignant.id}`,
        method: "PUT",
        body: enseignant,
      }),
    }),
    deleteEnseignant: builder.mutation({
      query: (id: string) => ({
        url: `enseignants/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEnseignantsQuery,
  useGetEnseignantQuery,
  useCreateEnseignantMutation,
  useUpdateEnseignantMutation,
  useDeleteEnseignantMutation,
} = enseignantApi;
