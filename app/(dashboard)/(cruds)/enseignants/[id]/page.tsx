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
  useUpdateEnseignantMutation,
  useGetEnseignantQuery,
} from "@/api/routes/crud/enseignants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  nom: z.string().min(2, {
    message: "Nom must be at least 2 characters.",
  }),
  prenom: z.string().min(2, {
    message: "Prenom must be at least 2 characters.",
  }),
  encadrant_code: z.string(),
  specialite: z.string(),
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
  const { data: enseigant } = useGetEnseignantQuery(params.id);
  const [updateEnseignant, { isSuccess }] = useUpdateEnseignantMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      encadrant_code: "",
      specialite: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (enseigant) {
      form.reset({
        nom: enseigant.nom || "",
        prenom: enseigant.prenom || "",
        encadrant_code: enseigant.encadrant_code || "",
        specialite: enseigant.specialite || "",
        email: enseigant.email || "",
        password: "",
      });
    }
  }, [enseigant, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await updateEnseignant({ id: enseigant.id, ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Enseigant modifié avec succès", {
        variant: "success",
      });
      router.push("/enseignants");
    }
  }, [isSuccess, enqueueSnackbar, router]);

  return (
    <main>
      <Card className="p-4">
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-2xl font-bold">
              Modifier Encadrant: {enseigant?.nom + " " + enseigant?.prenom} -{" "}
              {enseigant?.encadrant_code}
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
                      name="encadrant_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code Enseigant</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Code Enseigant"
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
                      name="specialite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialite</FormLabel>
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
                              <SelectItem value="Informatique">
                                Informatique
                              </SelectItem>
                              <SelectItem value="Biologie">Biologie</SelectItem>
                              <SelectItem value="Chimie">Chimie</SelectItem>
                              <SelectItem value="Physique">Physique</SelectItem>
                              <SelectItem value="Mathématiques">
                                Mathématiques
                              </SelectItem>
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
