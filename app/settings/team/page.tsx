import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clipboard } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex w-full flex-col items-start gap-5">
        <div className="flex w-full flex-col items-start gap-1">
          <span className="w-full text-2xl font-bold">Membres Du Groupe</span>
          <span className="w-full text-gray-400">
            Invite and manage teammates in your workspace.
          </span>
        </div>
        <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
        <div className="flex w-full flex-col items-start gap-6">
          <span className="text-xl font-semibold">Inviter</span>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Lien d&apos;invitaion:</Label>
            <Input
              disabled
              endIcon={Clipboard}
              id="email"
              placeholder="Email"
              value="https://ui.shadcn.com/docs/components/badge"
            />
          </div>
        </div>
        <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Membre</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center gap-4">
                  <Image
                    alt="Profile picture"
                    className="size-8 flex-none object-cover [clip-path:circle()]"
                    src="https://github.com/shadcn.png"
                  />
                  email@domain.com
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Secondary</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
