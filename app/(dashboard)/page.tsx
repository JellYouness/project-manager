"use client";
import { Activity, BookmarkCheck, Timer, BookmarkMinus, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetEquipesQuery } from "@/api/routes/crud/enseignants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetTasksQuery, useStatisticsQuery } from "@/api/routes/root/tasks";
import { baseApi, dispatch } from "@/api/baseApi";

export default function Home() {
  const { data: equipes } = useGetEquipesQuery();
  const { data: tasks, refetch } = useGetTasksQuery();
  //@ts-ignore
  const { data: stats } = useStatisticsQuery();
  const [userType, setUserType] = useState(null);
  const router = useRouter();
  const [totalEtudiants, setTotalEtudiants] = useState(0);
  const [totalEquipes, setTotalEquipes] = useState(0);
  const [totalProjets, setTotalProjets] = useState(0);

  const cards = [
    {
      title: "Taches en cours",
      icon: <BookmarkMinus className="size-6 text-muted-foreground" />,
      value: totalEtudiants,
      description: "+180.1% from last month",
    },
    {
      title: "Taches terminées",
      icon: <BookmarkCheck className="size-6 text-muted-foreground" />,
      value: totalEquipes,
      description: "+19% from last month",
    },
    {
      title: "Active Now",
      icon: <Activity className="size-6 text-muted-foreground" />,
      value: totalProjets,
      description: "+201 since last hour",
    },
    {
      title: "Active Now",
      icon: <Activity className="size-6 text-muted-foreground" />,
      value: totalProjets,
      description: "+201 since last hour",
    },
  ];

  useEffect(() => {
    setUserType(JSON.parse(localStorage.getItem("user") as string).type);
  }, [userType]);

  useEffect(() => {
    setTotalEtudiants(stats?.totalEtudiants);
    setTotalEquipes(stats?.totalEquipes);
    setTotalProjets(stats?.totalProjets);
    //@ts-ignore
  }, [stats]);

  const handleProjetClick = (equipe: any) => {
    if (equipe.sujet) {
      window.localStorage.setItem("projet", equipe.id);
      window.localStorage.setItem("sujet", equipe.sujet);
      dispatch(baseApi.util.invalidateTags(["task"]));
      router.push("/tasks");
    } else {
      router.push(`/groupes/${equipe.id}/add-sujet`);
    }
  };

  return (
    <main className="h-full">
      {userType === "encadrant" && (
        <div className="flex gap-7 mt-7">
          {equipes?.map((equipe: any, index: any) => (
            <Card
              key={index}
              onClick={() => {
                handleProjetClick(equipe);
              }}
              className="flex w-full flex-col items-center rounded bg-white shadow-default hover:bg-gray-100 cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex flex-col gap-2">
                  <span className="font-bold">Equipe #{equipe.id}</span>
                  <span>
                    <span className="font-bold">Sujet: </span>
                    {equipe.sujet}
                  </span>
                </CardTitle>
              </CardHeader>
              <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
              <CardContent className="flex w-full flex-col items-start p-2">
                <div className="flex w-full flex-row items-center justify-center gap-4 p-4">
                  <ul className="flex flex-row items-start gap-6 list-disc">
                    <li className="text-sm">
                      {equipe.etudiant1.nom + " " + equipe.etudiant1.prenom}
                    </li>
                    <li className="text-sm">
                      {equipe.etudiant2.nom + " " + equipe.etudiant2.prenom}
                    </li>
                    <li className="text-sm">
                      {equipe.etudiant3.nom + " " + equipe.etudiant3.prenom}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {userType === "admin" && (
        <div className="grid gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-2">
          {cards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent className="mt-2">
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {userType === "etudiant" && (
        <div className="flex gap-7 mt-7">
          <Card className="flex w-full flex-col items-start rounded bg-white shadow-default">
            <CardHeader className="flex flex-row w-full items-center gap-2 p-3">
              <div className="flex w-full items-center gap-2">
                <CardTitle className="w-full grow shrink-0 basis-0 text-lg font-bold">
                  To-do
                </CardTitle>
                <Link href="/tasks">
                  <Button>Voir tous</Button>
                </Link>
              </div>
            </CardHeader>
            <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
            <div className="flex w-full flex-col items-start p-2">
              {tasks
                ?.filter((task) => task.etat === "todo")
                .map((task) => (
                  <div
                    key={task.id}
                    className="w-full bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-lg font-bold">{task.titre}</p>
                      <p className="text-gray-500">{task.description}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <button
                        className="p-1 m-0 h-auto bg-transparent text-transparent"
                        disabled
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        className="p-1 m-0 h-auto bg-transparent text-transparent"
                        disabled
                      >
                        <Eye className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
          <Card className="flex w-full flex-col items-start rounded bg-white shadow-default">
            <CardHeader className="flex flex-row w-full items-center gap-2 p-3">
              <div className="flex w-full items-center gap-2">
                <CardTitle className="w-full grow shrink-0 basis-0 text-lg font-bold">
                  En cours
                </CardTitle>
                <Link href="/tasks">
                  <Button>Voir tous</Button>
                </Link>
              </div>
            </CardHeader>
            <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
            <div className="flex w-full flex-col items-start p-2">
              {tasks
                ?.filter((task) => task.etat === "encours")
                .map((task) => (
                  <div
                    key={task.id}
                    className="w-full bg-white flex justify-between text-sm rounded-md p-3 mb-2 shadow-sm border-[1px] border-gray-200 hover:bg-gray-200"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-lg font-bold">{task.titre}</p>
                      <p className="text-gray-500">{task.description}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <button
                        className="p-1 m-0 h-auto bg-transparent text-transparent"
                        disabled
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        className="p-1 m-0 h-auto bg-transparent text-transparent"
                        disabled
                      >
                        <Eye className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
