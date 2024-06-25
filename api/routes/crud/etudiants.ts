import { baseApi } from "@/api/baseApi";

const etudiantApi: any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEtudiants: builder.query({
      query: () => "list-etudiants",
      transformResponse: (response: any) => response.etudiants,
      providesTags: ["etudiant"],
    }),
    getEtudiantsNoEquipe: builder.query({
      query: () => `list-etudiants-sans-equipe`,
      transformResponse: (response: any) => response.etudiants_sans_equipe,
    }),
    getEtudiant: builder.query({
      query: (id: string) => `etudiant-infos/${id}`,
      transformResponse: (response: any) => response.etudiant,
    }),
    createEtudiant: builder.mutation({
      query: (etudiant: any) => ({
        url: `add-etudiant`,
        method: "POST",
        body: etudiant,
      }),
      invalidatesTags: ["etudiant"],
    }),
    updateEtudiant: builder.mutation({
      query: (etudiant: any) => ({
        url: `update-etudiant/${etudiant.id}`,
        method: "PUT",
        body: etudiant,
      }),
      invalidatesTags: ["etudiant"],
    }),
    deleteEtudiant: builder.mutation({
      query: (id: string) => ({
        url: `delete-etudiant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["etudiant"],
    }),
  }),
});

export const {
  useGetEtudiantsQuery,
  useGetEtudiantsNoEquipeQuery,
  useGetEtudiantQuery,
  useCreateEtudiantMutation,
  useUpdateEtudiantMutation,
  useDeleteEtudiantMutation,
} = etudiantApi;


