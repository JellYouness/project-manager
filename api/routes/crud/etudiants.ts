import { baseApi } from "@/api/baseApi";


const etudiantApi: any = baseApi.injectEndpoints({
    endpoints: builder => ({
        getEtudiants: builder.query({
            query: () => "etudiants",
        }),
        getEtudiant: builder.query({
            query: (id: string) => `etudiants/${id}`,
        }),
        createEtudiant: builder.mutation({
            query: (etudiant: any) => ({
                url: `etudiants`,
                method: "POST",
                body: etudiant,
            }),
        }),
        updateEtudiant: builder.mutation({
            query: (etudiant: any) => ({
                url: `etudiants/${etudiant.id}`,
                method: "PUT",
                body: etudiant,
            }),
        }),
        deleteEtudiant: builder.mutation({
            query: (id: string) => ({
                url: `etudiants/${id}`,
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