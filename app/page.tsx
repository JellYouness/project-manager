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

const cards = [
  {
    title: "Temps restant",
    icon: <Timer className="h-4 w-4 text-muted-foreground" />,
    value: "$45,231.89",
    description: "+20.1% from last month",
  },
  {
    title: "Taches en cours",
    icon: <BookmarkMinus className="h-4 w-4 text-muted-foreground" />,
    value: "+2350",
    description: "+180.1% from last month",
  },
  {
    title: "Taches terminées",
    icon: <BookmarkCheck className="h-4 w-4 text-muted-foreground" />,
    value: "+12,234",
    description: "+19% from last month",
  },
  {
    title: "Active Now",
    icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    value: "+573",
    description: "+201 since last hour",
  },
];

export default function Home() {
  return (
    <main>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
