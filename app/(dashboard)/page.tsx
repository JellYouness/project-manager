"use client";
import { Activity, BookmarkCheck, Timer, BookmarkMinus } from "lucide-react";
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

const tasks = [
  {
    icon: "FeatherReceipt",
    title: "Process invoices",
    description: "You have 1 to review",
    time: "Today",
  },
  {
    icon: "FeatherUploadCloud",
    title: "Upload additional documents",
    description: "We need a few more details",
    time: "Today",
  },
  {
    icon: "FeatherCreditCard",
    title: "Set up a payment method",
    description: "Avoid delaying invoices and payments",
    time: "Yesterday",
  },
  {
    icon: "FeatherCheckCheck",
    title: "Finish verification",
    description: "Verify your account securely",
    time: "Yesterday",
  },
];

const events = [
  {
    icon: "FeatherCalendar",
    title: "Department Offsite",
    date: "Monday, Nov 13, 2023",
    time: "All-day",
  },
  {
    icon: "FeatherCalendar",
    title: "Quartery Review",
    date: "Tuesday, Nov 3, 2023",
    time: "9:00 AM",
  },
  {
    icon: "FeatherCalendar",
    title: "Project kick-off",
    date: "Monday, Nov 13, 2023",
    time: "3:00 PM",
  },
];

export default function Home() {
  const { data: equipes } = useGetEquipesQuery();
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
      {userType !== "encadrant" && (
        <>
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

          <div className="flex gap-7 mt-7">
            <Card className="flex w-full flex-col items-start rounded bg-white shadow-default">
              <CardHeader className="flex flex-row w-full items-center gap-2 p-3">
                <div className="flex w-full items-center gap-2">
                  <CardTitle className="w-full grow shrink-0 basis-0 text-lg font-bold">
                    To-do
                  </CardTitle>
                  <Link href="/dashboard">
                    <Button>View all</Button>
                  </Link>
                </div>
              </CardHeader>
              <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
              <div className="flex w-full flex-col items-start p-2">
                {tasks.map((task, i) => (
                  <div className="flex w-full items-center gap-4 p-4" key={i}>
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-1">
                      <span className="w-full text-sm">{task.title}</span>
                      <span className="w-full text-sm text-gray-400">
                        {task.description}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{task.time}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="flex w-full flex-col items-start rounded bg-white shadow-default">
              <CardHeader className="flex flex-row w-full items-center gap-2 p-3">
                <CardTitle className="w-full grow shrink-0 basis-0 text-lg font-bold">
                  Upcoming events
                </CardTitle>
                <Link href="/calendar">
                  <Button>View all</Button>
                </Link>
              </CardHeader>
              <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
              <CardContent className="flex w-full flex-col items-start p-2">
                {events.map((event, i) => (
                  <div className="flex w-full items-center gap-4 p-4" key={i}>
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-1">
                      <span className="w-full text-sm">{event.title}</span>
                      <span className="w-full text-sm text-gray-400">
                        {event.date}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{event.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </main>
  );
}
