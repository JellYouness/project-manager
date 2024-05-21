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

export type Enseignant = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  specialite: "SID" | "RES" | "BD";
};

export const columns: ColumnDef<Enseignant>[] = [
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
    accessorKey: "specialite",
    header: () => <div>specialite</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("specialite")}</div>
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
              href={`/enseignants/${row.id}`}
            >
              <Pencil className="size-5" />
              Modifier
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex flex-center gap-3"
              href={`/enseignants/${row.id}`}
            >
              <Trash className="size-5" />
              Supprimer
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex flex-center gap-3"
              href={`/enseignants/${row.id}`}
            >
              <Eye className="size-5" />
              Voir
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
