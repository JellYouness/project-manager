import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home({ params }: { params: { id: number } }) {
  return (
    <main>
      <Card className="p-4">
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-2xl font-bold">
              Compte Id {params.id}
            </span>
            <span className="w-full text-gray-400">
              Update your profile and personal details here
            </span>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
          <div className="flex w-full flex-col items-start gap-6">
            <span className="text-xl font-semibold">Profile</span>
            <div className="flex w-full items-center gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="nom">Nom:</Label>
                <Input type="text" id="nom" placeholder="Nom" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="prenom">Prenom:</Label>
                <Input type="text" id="prenom" placeholder="Prenom" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="prenom">Cin:</Label>
                <Input type="text" id="prenom" placeholder="Cin" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="prenom">Cne:</Label>
                <Input type="text" id="prenom" placeholder="Cne" />
              </div>
            </div>
            <div className="flex w-full items-center gap-4">
              <div className="grid w-full max-w-[49rem] items-center gap-1.5">
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
              <div className="grid w-full max-w-[49rem] items-center gap-1.5">
                <Label htmlFor="email">Filiere:</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
            </div>
            <div className="flex w-full items-center justify-end">
              <Button>Modifier</Button>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
