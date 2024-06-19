import { baseApi } from "@/api/baseApi";


const etudiantApi: any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEtudiants: builder.query({
      query: () => "list-etudiants",
    }),
    getEtudiant: builder.query({
      query: (id: string) => `etudiant-infos/${id}`,
    }),
    createEtudiant: builder.mutation({
      query: (etudiant: any) => ({
        url: `add-etudiant`,
        method: "POST",
        body: etudiant,
      }),
    }),
    updateEtudiant: builder.mutation({
      query: (etudiant: any) => ({
        url: `update-etudiant/${etudiant.id}`,
        method: "PUT",
        body: etudiant,
      }),
    }),
    deleteEtudiant: builder.mutation({
      query: (id: string) => ({
        url: `delete-etudiant/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
    useGetEtudiantsQuery,
    useGetEtudiantQuery,
    useCreateEtudiantMutation,
    useUpdateEtudiantMutation,
    useDeleteEtudiantMutation,
} = etudiantApi;