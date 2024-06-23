import { baseApi } from "@/api/baseApi";

const sujetApi: any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSujets: builder.query({
      query: () => "list-sujets",
      transformResponse: (response: any) => response.sujets,
      providesTags: ["sujet"],
    }),
    getSujet: builder.query({
      query: (id: string) => `encadrant-infos/${id}`,
      transformResponse: (response: any) => response.sujet,
    }),
    createSujet: builder.mutation({
      query: (Sujet: any) => ({
        url: `add-sujets`,
        method: "POST",
        body: Sujet,
      }),
      invalidatesTags: ["sujet"],
    }),
    updateSujet: builder.mutation({
      query: (Sujet: any) => ({
        url: `update-sujet/${Sujet.id}`,
        method: "PUT",
        body: Sujet,
      }),
      invalidatesTags: ["sujet"],
    }),
    assignSujet: builder.mutation({
      query: (body: any) => ({
        url: `encadrant/equipes/${body.id}/assign-sujet`,
        method: "POST",
        body: { ...body, etat: "encours" },
      }),
      invalidatesTags: ["sujet", "task", "myequipes"],
    }),
  }),
});

export const {
  useGetSujetsQuery,
  useGetSujetQuery,
  useCreateSujetMutation,
  useUpdateSujetMutation,
  useAssignSujetMutation,
} = sujetApi;
