import { baseApi } from "@/api/baseApi";

const enseignantApi: any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnseignants: builder.query({
      query: () => "list-encadrants",
      transformResponse: (response: any) => response.encadrants,
      providesTags: ["enseignant"],
    }),
    getEnseignant: builder.query({
      query: (id: string) => `encadrant-infos/${id}`,
      transformResponse: (response: any) => response.encadrant,
    }),
    createEnseignant: builder.mutation({
      query: (enseignant: any) => ({
        url: `add-encadrant`,
        method: "POST",
        body: enseignant,
      }),
      invalidatesTags: ["enseignant"],
    }),
    updateEnseignant: builder.mutation({
      query: (enseignant: any) => ({
        url: `update-encadrant/${enseignant.id}`,
        method: "PUT",
        body: enseignant,
      }),
      invalidatesTags: ["enseignant"],
    }),
    deleteEnseignant: builder.mutation({
      query: (id: string) => ({
        url: `delete-encadrant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["enseignant"],
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
