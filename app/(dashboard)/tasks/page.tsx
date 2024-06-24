"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Eye, FilePenLine, Pencil, Plus } from "lucide-react";
import { use, useEffect, useState } from "react";
import {
  Task,
  useEncadrantUpdateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/api/routes/root/tasks";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Typography } from "@mui/material";
import AddTaskDialog from "./AddDialog";
import { Input } from "@/components/ui/input";
import TaskDetailsDialog from "./TaskDialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useSnackbar } from "notistack";

export default function Home() {
  const { data: tasks, refetch } = useGetTasksQuery();
  const [updateTask, { isSuccess }] = useUpdateTaskMutation();
  const [encadrantUpdateTask, { isSuccess: success }] =
    useEncadrantUpdateTaskMutation();
  const [inProgress, setInProgress] = useState<number | null>(null);
  const [done, setDone] = useState<number | null>(null);
  const [review, setReview] = useState<number | null>(null);
  const [addTaskDialog, setAddTaskDialog] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [userType, setUserType] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setUserType(JSON.parse(localStorage.getItem("user")!).type);
  }, [userType]);

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const markAsProgress = (taskId: number) => {
    updateTask({ id: taskId, etat: "encours" });
  };

  const markAsReview = (taskId: number) => {
    updateTask({ id: taskId, etat: "toreview", document: file });
  };

  const markAsDone = (taskId: number, feedback: string) => {
    encadrantUpdateTask({ id: taskId, etat: "termine", feedback: feedback });
  };

  useEffect(() => {
    if (isSuccess || success) {
      enqueueSnackbar("Tache modifié avec succès", {
        variant: "success",
      });
    }
  }, [isSuccess, enqueueSnackbar, success]);

  return (
    <main className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-3/4 overflow-y-hidden">
        <Card className="bg-[#F7F8F9] px-4 pt-2 max-h-full overflow-y-scroll">
          <CardHeader className="flex flex-row justify-between items-center p-1 mb-4">
            <CardTitle className="text-gray-600 text-md font-bold">
              To Do
            </CardTitle>
            <Button
              className={cn(
                "p-1 m-0 h-auto",
                userType !== "encadrant"
                  ? "bg-transparent text-transparent"
                  : "bg-green-500 hover:bg-green-600 text-white "
              )}
              disabled={userType !== "encadrant"}
              onClick={() => {
                setAddTaskDialog(true);
              }}
            >
              <Plus className="size-5" />
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            {tasks
              ?.filter((task) => task.etat === "todo")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200"
                >
                  <div className="flex flex-col items-start gap-1">
                    <p>{task.titre}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className={cn(
                        "p-1 rounded z-20",
                        userType === "encadrant"
                          ? "bg-transparent text-transparent"
                          : "bg-blue-500 hover:bg-blue-600 text-white "
                      )}
                      disabled={userType === "encadrant"}
                      onClick={() => setInProgress(task.id!)}
                    >
                      <Plus className="size-4" />
                    </button>
                    <button
                      className="bg-gray-200 hover:bg-gray-400 text-black p-1 rounded z-20"
                      onClick={() => setViewTask(task)}
                    >
                      <Eye className="size-4" />
                    </button>
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
            <Button
              className="p-1 m-0 h-auto bg-transparent text-transparent"
              disabled
            >
              <Plus className="size-5 " />
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            {tasks
              ?.filter((task) => task.etat === "encours")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200"
                >
                  <div className="flex flex-col items-start gap-1">
                    <p>{task.titre}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className={cn(
                        "p-1 rounded z-20",
                        userType === "encadrant"
                          ? "bg-transparent text-transparent"
                          : "bg-green-500 hover:bg-green-600 text-white "
                      )}
                      disabled={userType === "encadrant"}
                      onClick={() => setReview(task.id!)}
                    >
                      <FilePenLine className="size-4" />
                    </button>
                    <button
                      className="bg-gray-200 hover:bg-gray-400 text-black p-1 rounded z-20"
                      onClick={() => setViewTask(task)}
                    >
                      <Eye className="size-4" />
                    </button>
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
            <Button
              className="p-1 m-0 h-auto bg-transparent text-transparent"
              disabled
            >
              <Plus className="size-5 " />
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            {tasks
              ?.filter((task) => task.etat === "toreview")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200"
                >
                  <div className="flex flex-col items-start gap-1">
                    <p>{task.titre}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className={cn(
                        "p-1 rounded z-20",
                        userType === "etudiant"
                          ? "bg-transparent text-transparent"
                          : "bg-cyan-500 hover:bg-cyan-600 text-black "
                      )}
                      disabled={userType === "etudiant"}
                      onClick={() => setDone(task.id!)}
                    >
                      <Check className="size-4" />
                    </button>
                    <button
                      className="bg-gray-200 hover:bg-gray-400 text-black p-1 rounded z-20"
                      onClick={() => setViewTask(task)}
                    >
                      <Eye className="size-4" />
                    </button>
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
                ?.filter((task) => task.etat === "termine")
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200"
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
                      <button
                        className="bg-gray-200 hover:bg-gray-400 text-black p-1 rounded z-20"
                        onClick={() => setViewTask(task)}
                      >
                        <Eye className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <TaskDetailsDialog open={viewTask} onClose={() => setViewTask(null)} />

      <AddTaskDialog
        open={addTaskDialog}
        onClose={() => setAddTaskDialog(false)}
      />

      <ConfirmDialog
        open={inProgress !== null}
        onClose={() => setInProgress(null)}
        title="Set task as in progress"
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
        title="set task as to review"
        content={
          <div>
            <Typography variant="body1" color="textSecondary">
              Are you sure you want to set this task as to review?
            </Typography>{" "}
            <br />
            <Label>Document:</Label>
            <Input
              placeholder="document"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>
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
        title="set task as done"
        content={
          <Input
            placeholder="Feedback"
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
        }
        action={
          <Button
            onClick={() => {
              if (done) {
                markAsDone(done, feedback);
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
