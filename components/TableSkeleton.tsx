import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

const TableSkeleton = ({ colSpan }: any) => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={colSpan} className="h-14 text-center">
          <Skeleton className="h-14 w-full" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={colSpan} className="h-14 text-center">
          <Skeleton className="h-14 w-full" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={colSpan} className="h-14 text-center">
          <Skeleton className="h-14 w-full" />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableSkeleton;
