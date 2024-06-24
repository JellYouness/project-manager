import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FileIcon, defaultStyles } from "react-file-icon";

// Function to get the icon based on file extension
function getFileExtension(url: any) {
  // Get the path from the URL
  let path = new URL(url).pathname;

  // Get the filename from the path
  const filename = path.split("/").pop();

  // Find the position of the last dot (.)
  let dotIndex = filename?.lastIndexOf(".");

  if (dotIndex === -1) {
    return ""; // No extension found
  } else {
    // Extract the extension
    return filename?.slice(dotIndex! + 1);
  }
}

export const getFileIcon = (url: any) => {
  const extension = getFileExtension(url);
  switch (extension) {
    case "pdf":
      return <FileIcon extension="pdf" {...defaultStyles.pdf} />;
    case "doc":
      return <FileIcon extension="doc" {...defaultStyles.doc} />;
    case "docx":
      return <FileIcon extension="docx" {...defaultStyles.docx} />;
    default:
      return <FileText className="mr-2 h-4 w-4" />;
  }
};

// Columns definition
export const columns: ColumnDef<any>[] = [
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
    id: "nom",
    accessorFn: (row) => row.nom,
    header: () => <div>Nom</div>,
    cell: ({ row }) => <div className="font-medium">{row.getValue("nom")}</div>,
  },
  {
    id: "document",
    accessorFn: (row) => row.document,
    header: () => <div>Document</div>,
    cell: ({ row }) => {
      const documentUrl: string = row.getValue("document");
      const fileIcon = getFileIcon(documentUrl);

      return (
        <Link
          href={documentUrl}
          target="_blank"
          className="flex items-center justify-center w-9"
        >
          {fileIcon}
        </Link>
      );
    },
  },
  {
    id: "dispo",
    accessorFn: (row) =>
      row.disponible === 1 ? "Disponible" : "Non disponible",
    header: () => <div>Etat</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("dispo")}</div>
    ),
  },
];
