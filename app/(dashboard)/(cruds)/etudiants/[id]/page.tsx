"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { SnackbarProvider, useSnackbar } from "notistack";
import {
  useUpdateEtudiantMutation,
  useGetEtudiantQuery,
} from "@/api/routes/crud/etudiants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  nom: z.string().min(2, {
    message: "Nom must be at least 2 characters.",
  }),
  prenom: z.string().min(2, {
    message: "Prenom must be at least 2 characters.",
  }),
  cin: z.string().min(2, {
    message: "CIN must be at least 2 characters.",
  }),
  cne: z.string().min(2, {
    message: "CNE must be at least 2 characters.",
  }),
  codeApoge: z.any(),
  filiere: z.string(),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export default function Home({ params }: { params: { id: number } }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data: etudiant } = useGetEtudiantQuery(params.id);
  const [updateEtudiant, { isSuccess }] = useUpdateEtudiantMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      cin: "",
      cne: "",
      codeApoge: "",
      filiere: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (etudiant) {
      form.reset({
        nom: etudiant.nom || "",
        prenom: etudiant.prenom || "",
        cin: etudiant.cin || "",
        cne: etudiant.cne || "",
        codeApoge: etudiant.codeApoge || "",
        filiere: etudiant.filiere || "",
        email: etudiant.email || "",
        password: "",
      });
    }
  }, [etudiant, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await updateEtudiant({ id: etudiant.id, codeApoge: `${data.codeApoge}`, ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Etudiant modifié avec succès", {
        variant: "success",
      });
      router.push("/etudiants");
    }
  }, [isSuccess, enqueueSnackbar, router]);

  return (
    <main>
      <Card className="p-4">
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-2xl font-bold">
              Modifier Etudiant: {etudiant?.nom + " " + etudiant?.prenom} -{" "}
              {etudiant?.codeApoge}
            </span>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
          <div className="flex w-full flex-col items-start gap-6">
            <span className="text-xl font-semibold">Profile</span>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <div className="flex w-full items-center gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="prenom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Prénom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="cin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CIN</FormLabel>
                          <FormControl>
                            <Input placeholder="CIN" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="cne"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNE</FormLabel>
                          <FormControl>
                            <Input placeholder="CNE" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="codeApoge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code Apoge</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Code Apoge"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="filiere"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Filiere</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choisir une filiere" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="SID">SID</SelectItem>
                              <SelectItem value="BDD">BDD</SelectItem>
                              <SelectItem value="RES">RES</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center gap-4">
                  <div className="grid w-full max-w-[49rem] items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid w-full max-w-[49rem] items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de passe</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Mot de passe"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-end">
                  <Button disabled={form.formState.isSubmitting}>
                    Modifier
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Card>
    </main>
  );
}
