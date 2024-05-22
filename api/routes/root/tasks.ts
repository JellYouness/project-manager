import { baseApi } from "@/api/baseApi";

interface Task {
  id: number;
  titre: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status: "todo" | "inprogress" | "done";
  feedback?: string;
}

const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => "tasks",
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
    }),
    updateTask: build.mutation<Task, Partial<Task>>({
      query: ({ id, ...body }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
