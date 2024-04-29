"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: "todo" },
    { id: 2, title: "Task 2", status: "inprogress" },
    { id: 3, title: "Task 3", status: "done" },
  ]);

  const addTask = () => {
    const newTask = { id: tasks.length + 1, title: "New Task", status: "todo" };
    setTasks([...tasks, newTask]);
  };

  const markAsDone = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: "done" };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const markAsProgress = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: "inprogress" };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (taskId: number, newTitle: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        <Card className="bg-gray-100 p-4">
          <CardTitle className="text-gray-600 text-md font-bold mb-4">
            To Do
          </CardTitle>
          <CardContent className="px-0">
            {tasks
              .filter((task) => task.status === "todo")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white flex justify-between text-sm rounded-md p-4 mb-2 shadow-xl"
                >
                  <div className="flex flex-col items-start gap-2">
                    <p>{task.title}</p>
                    <Avatar className="size-7">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="bg-blue-500 text-white p-1 rounded"
                      onClick={() => editTask(task.id, "New Title")}
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      className="bg-green-500 text-white p-1 rounded"
                      onClick={() => markAsProgress(task.id)}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
          </CardContent>
          <button
            className="bg-gray-500 text-white px-2 py-1 rounded"
            onClick={addTask}
          >
            Add Task
          </button>
        </Card>
        <Card className="bg-gray-100 p-4">
          <CardTitle className="text-gray-600 text-md font-bold mb-4">
            In Progress
          </CardTitle>
          <CardContent className="px-0">
            {tasks
              .filter((task) => task.status === "inprogress")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white flex justify-between text-sm rounded-md p-4 mb-2 shadow-xl"
                >
                  <div className="flex flex-col items-start gap-2">
                    <p>{task.title}</p>
                    <Avatar className="size-7">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="bg-blue-500 text-white p-1 rounded"
                      onClick={() => editTask(task.id, "New Title")}
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      className="bg-green-500 text-white p-1 rounded"
                      onClick={() => markAsDone(task.id)}
                    >
                      <Check className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
          </CardContent>
          <button
            className="bg-gray-500 text-white px-2 py-1 rounded"
            onClick={addTask}
          >
            Add Task
          </button>
        </Card>
        <Card className="bg-gray-100 p-4">
          <CardTitle className="text-gray-600 text-md font-bold mb-4">
            Done
          </CardTitle>
          <CardContent className="px-0">
            {tasks
              .filter((task) => task.status === "done")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white flex justify-between text-sm rounded-md p-4 mb-2 shadow-xl"
                >
                  <div className="flex flex-col items-start gap-2">
                    <p>{task.title}</p>
                    <Avatar className="size-7">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="bg-blue-500 text-white p-1 rounded"
                      onClick={() => editTask(task.id, "New Title")}
                    >
                      <Pencil className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
          </CardContent>
          <button
            className="bg-gray-500 text-white px-2 py-1 rounded"
            onClick={addTask}
          >
            Add Task
          </button>
        </Card>
      </div>
    </main>
  );
}
