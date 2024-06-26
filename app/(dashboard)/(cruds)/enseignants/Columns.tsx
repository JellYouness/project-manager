import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useDeleteEnseignantMutation } from "@/api/routes/crud/enseignants";

export type Enseignant = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  specialite: "SID" | "RES" | "BD";
};

const ActionButtons = ({ id }: { id: string }) => {
  const [deleteEnseignant] = useDeleteEnseignantMutation();

  return (
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
          <Link className="flex flex-center gap-3" href={`/enseignants/${id}`}>
            <Pencil className="size-5" />
            Modifier
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex flex-center gap-3"
            onClick={() => {
              deleteEnseignant(id);
            }}
          >
            <Trash className="size-5" />
            Supprimer
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
    accessorKey: "encadrant_code",
    header: () => <div>Code</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("encadrant_code")}</div>
    ),
  },
  {
    accessorKey: "specialite",
    header: () => <div>Specialite</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("specialite")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionButtons id={row.getValue("id")} />,
  },
];
