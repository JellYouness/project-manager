"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Pencil, Plus } from "lucide-react";
import { use, useState } from "react";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/api/routes/root/tasks";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Typography } from "@mui/material";

export default function Home() {
  const { data: tasks } = useGetTasksQuery();
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const [inProgress, setInProgress] = useState<number | null>(null);
  const [done, setDone] = useState<number | null>(null);
  const [review, setReview] = useState<number | null>(null);

  const addTask = () => {
    const newTask = {
      id: tasks?.length ?? 0 + 1,
      titre: "New Task",
      status: "todo",
    };
    //setTasks([...tasks, newTask]);
  };

  const markAsDone = (taskId: number) => {
    updateTask({ id: taskId, status: "done" });
  };

  const markAsProgress = (taskId: number) => {
    updateTask({ id: taskId, status: "inprogress" });
  };

  const markAsReview = (taskId: number) => {
    updateTask({ id: taskId, status: "review" });
  };

  const editTask = (taskId: number, newTitre: string) => {
    const updatedTasks = tasks?.map((task) => {
      if (task.id === taskId) {
        return { ...task, titre: newTitre };
      }
      return task;
    });
    //setTasks(updatedTasks);
  };

  return (
    <main className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-3/4 overflow-y-hidden">
        <Card className="bg-[#F7F8F9] px-4 pt-2 max-h-full overflow-y-scroll">
          <CardHeader className="flex flex-row justify-between items-center p-1 mb-4">
            <CardTitle className="text-gray-600 text-md font-bold">
              To Do
            </CardTitle>
            <Button className="p-1 m-0 h-auto" onClick={() => {}}>
              <Plus className="size-5" />
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            {tasks
              ?.filter((task) => task.status === "todo")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200 hover:cursor-pointer"
                >
                  <div className="flex flex-col items-start gap-1">
                    <p>{task.titre}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
                      onClick={() => setInProgress(task.id)}
                    >
                      <Plus className="size-4" />
                    </button>
                    <Avatar className="size-6">
                      <AvatarFallback className="text-white bg-purple-800 text-[11px] font-semibold">
                        YJ
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="bg-[#F7F8F9] px-4 pt-2 max-h-full overflow-y-scroll">
          <CardHeader className="flex flex-row justify-between items-center p-1 mb-4">
            <CardTitle className="text-gray-600 text-md font-bold">
              In Progress
            </CardTitle>
            <Button className="p-1 m-0 h-auto" onClick={() => {}}>
              <Plus className="size-5" />
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            {tasks
              ?.filter((task) => task.status === "inprogress")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200 hover:cursor-pointer"
                >
                  <div className="flex flex-col items-start gap-1">
                    <p>{task.titre}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white p-1 rounded"
                      onClick={() => markAsReview(task.id)}
                    >
                      <Check className="size-4" />
                    </button>
                    <Avatar className="size-6">
                      <AvatarFallback className="text-white bg-purple-800 text-[11px] font-medium">
                        YJ
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="bg-[#F7F8F9] px-4 pt-2 max-h-full overflow-y-scroll">
          <CardHeader className="flex flex-row justify-between items-center p-1 mb-4">
            <CardTitle className="text-gray-600 text-md font-bold">
              To review
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            {tasks
              ?.filter((task) => task.status === "review")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200 hover:cursor-pointer"
                >
                  <div className="flex flex-col items-start gap-1">
                    <p>{task.titre}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white p-1 rounded"
                      onClick={() => setDone(task.id)}
                    >
                      <Check className="size-4" />
                    </button>
                    <Avatar className="size-6">
                      <AvatarFallback className="text-white bg-purple-800 text-[11px] font-semibold">
                        YJ
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
      <div className="h-2/4 w-full py-4">
        <Card className="bg-[#F7F8F9] px-4 pt-2 max-h-full w-full overflow-y-scroll">
          <CardHeader className="flex flex-row justify-between items-center p-1 mb-4">
            <CardTitle className="text-gray-600 text-md font-bold">
              Terminé
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-hidden">
              {tasks
                ?.filter((task) => task.status === "done")
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200 hover:cursor-pointer"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <p>{task.titre}</p>
                      <p className="text-xs text-gray-500">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <button
                        className="p-1 m-0 h-auto bg-transparent text-transparent"
                        disabled
                      >
                        <Plus className="size-4" />
                      </button>
                      <Avatar className="size-6">
                        <AvatarFallback className="text-white bg-purple-800 text-[11px] font-semibold">
                          YJ
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ConfirmDialog
        open={inProgress !== null}
        onClose={() => setInProgress(null)}
        title="Cancel"
        content={
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to set this task as in progress?
          </Typography>
        }
        action={
          <Button
            onClick={() => {
              if (inProgress) {
                markAsProgress(inProgress);
                setInProgress(null);
              }
            }}
          >
            Set in progress
          </Button>
        }
      />

      <ConfirmDialog
        open={review !== null}
        onClose={() => setReview(null)}
        title="Cancel"
        content={
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to set this task as review?
          </Typography>
        }
        action={
          <Button
            onClick={() => {
              if (review) {
                markAsReview(review);
                setReview(null);
              }
            }}
          >
            Set Review
          </Button>
        }
      />

      <ConfirmDialog
        open={done !== null}
        onClose={() => setDone(null)}
        title="Cancel"
        content={
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to set this task as done?
          </Typography>
        }
        action={
          <Button
            onClick={() => {
              if (done) {
                markAsDone(done);
                setDone(null);
              }
            }}
          >
            Set Done
          </Button>
        }
      />
    </main>
  );
}
