import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { useDeleteEtudiantMutation } from "@/api/routes/crud/etudiants";

export type Etudiant = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  codeApoge: number;
  cin: string;
  cne: string;
  filiere: "SID" | "RES" | "BD";
};

export const columns: ColumnDef<Etudiant>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    id: "Nom et Prenom",
    accessorFn: (row) => `${row.nom} ${row.prenom}`,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("Nom et Prenom")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "cne",
    header: () => <div>CNE</div>,
    cell: ({ row }) => <div className="font-medium">{row.getValue("cne")}</div>,
  },
  {
    accessorKey: "codeApoge",
    header: () => <div>Code Apoge</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("codeApoge")}</div>
    ),
  },
  {
    accessorKey: "filiere",
    header: () => <div>Filiere</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("filiere")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              className="flex flex-center gap-3"
              href={`/etudiants/${row.getValue("id")}`}
            >
              <Pencil className="size-5" />
              Modifier
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button className="flex flex-center gap-3" onClick={() => {}}>
              <Trash className="size-5" />
              Supprimer
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
