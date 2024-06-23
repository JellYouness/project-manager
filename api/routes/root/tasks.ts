import { baseApi } from "@/api/baseApi";
import { RefreshCcw } from "lucide-react";

export interface Task {
  id?: number;
  titre: string;
  description?: string;
  date_debut: string;
  date_fin: string;
  etat?: "todo" | "encours" | "toreview" | "termine";
  feedback?: string;
  document?: any;
  documents?: [];
}

function getFromLocalStorage(key: any) {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
  return null;
}

const user = getFromLocalStorage("user");
const type = user ? JSON.parse(user).type : null;

const projet = getFromLocalStorage("projet");
const projetId = projet ? JSON.parse(projet) : null;

const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => ({
        url:
          type === "etudiant"
            ? "etudiant/taches-assignees"
            : `encadrant/projets/${JSON.parse(window.localStorage.getItem("projet") as string)}/taches`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.taches,
      providesTags: ["task"],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: `encadrant/projets/${JSON.parse(window.localStorage.getItem("projet") as string)}/taches`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["task"],
    }),
    updateTask: build.mutation<Task, Partial<Task>>({
      query: ({ id, ...body }) => {
        if (body.document) {
          const formData = new FormData();
          formData.append("document", body.document);
          formData.append("etat", "toreview");
          return {
            url: `etudiant/taches/${id}`,
            method: "PUT",
            body: formData,
          };
        } else {
          return {
            url: `etudiant/taches/${id}`,
            method: "PUT",
            body,
          };
        }
      },
      invalidatesTags: ["task"],
    }),
    encadrantUpdateTask: build.mutation<Task, Partial<Task>>({
      query: ({ id, ...body }) => ({
        url: `encadrant/taches/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["task"],
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["task"],
    }),
    statistics: build.query({
      query: () => ({
        url: "/admin/statistics",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useEncadrantUpdateTaskMutation,
  useDeleteTaskMutation,
  useStatisticsQuery,
} = tasksApi;
