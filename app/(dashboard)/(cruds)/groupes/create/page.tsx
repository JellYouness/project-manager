"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateEnseignantMutation,
  useGetEnseignantsQuery,
} from "@/api/routes/crud/enseignants";
import { Autocomplete, TextField } from "@mui/material";
import { useGetEtudiantsNoEquipeQuery } from "@/api/routes/crud/etudiants";
import { useCreateGroupeMutation } from "@/api/routes/crud/groupes";

const FormSchema = z.object({
  etudiant_1_codeApoge: z.any(),
  etudiant_2_codeApoge: z.any(),
  etudiant_3_codeApoge: z.any(),
  encadrant_code: z.any(),
});

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const [createGroupe, { isSuccess }] = useCreateGroupeMutation();
  const { data: etudiantsData } = useGetEtudiantsNoEquipeQuery();
  const { data: enseignantsData } = useGetEnseignantsQuery();
  const [etudiants, setEtudiants] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [selectedEtudiants, setSelectedEtudiants] = useState<{
    [key: string]: string;
  }>({
    etudiant_1_codeApoge: "",
    etudiant_2_codeApoge: "",
    etudiant_3_codeApoge: "",
  });
  const [selectedEncadrant, setSelectedEncadrant] = useState("");

  useEffect(() => {
    if (etudiantsData) {
      setEtudiants(etudiantsData);
    }
    if (enseignantsData) {
      setEnseignants(enseignantsData);
    }
  }, [etudiantsData, enseignantsData]);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      etudiant_1_codeApoge: "",
      etudiant_2_codeApoge: "",
      etudiant_3_codeApoge: "",
      encadrant_code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createGroupe(data);
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Groupe ajouté avec succès", {
        variant: "success",
      });
      router.push("/groupes");
    }
  }, [isSuccess, enqueueSnackbar, router]);

  const filterOptions = (etudiantKey: keyof typeof selectedEtudiants) => {
    const selectedValues = Object.values(selectedEtudiants).filter(
      (val: any) => val && val !== selectedEtudiants[etudiantKey]
    );
    return etudiants.filter(
      (etudiant: any) => !selectedValues.includes(etudiant.codeApoge)
    );
  };

  return (
    <main>
      <Card className="p-4">
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-2xl font-bold">Ajouter</span>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
          <div className="flex w-full flex-col items-start gap-6">
            <span className="text-xl font-semibold">Profile</span>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <div className="flex flex-row w-full items-center gap-4">
                  {[
                    "etudiant_1_codeApoge",
                    "etudiant_2_codeApoge",
                    "etudiant_3_codeApoge",
                  ].map((etudiantKey: any, index) => (
                    <div
                      key={etudiantKey}
                      className="grid w-full max-w-sm items-center gap-1.5"
                    >
                      <FormField
                        control={form.control}
                        name={etudiantKey}
                        render={({ field }) => (
                          <FormItem className="flex items-start flex-col w-full">
                            <FormLabel>Etudiant #{index + 1}</FormLabel>
                            <FormControl>
                              <Controller
                                name={etudiantKey}
                                control={form.control}
                                render={({
                                  field: { onChange, value, ...rest },
                                }) => (
                                  <Autocomplete
                                    className="w-full"
                                    options={filterOptions(etudiantKey)}
                                    getOptionLabel={(option: any) =>
                                      option.nom + " " + option.prenom
                                    }
                                    onChange={(_, data) => {
                                      onChange(data?.codeApoge || "");
                                      setSelectedEtudiants((prev) => ({
                                        ...prev,
                                        [etudiantKey]: data?.codeApoge || "",
                                      }));
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder={`Etudiant #${index + 1}`}
                                      />
                                    )}
                                    {...rest}
                                  />
                                )}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex w-full items-center gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="encadrant_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Encadrant Code</FormLabel>
                          <FormControl>
                            <Controller
                              name="encadrant_code"
                              control={form.control}
                              render={({
                                field: { onChange, value, ...rest },
                              }) => (
                                <Autocomplete
                                  options={enseignants}
                                  getOptionLabel={(option: any) =>
                                    option.nom + " " + option.prenom
                                  }
                                  onChange={(_, data) => {
                                    onChange(data?.encadrant_code || "");
                                    setSelectedEncadrant(
                                      data?.encadrant_code || ""
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      placeholder="Encadrant Code"
                                    />
                                  )}
                                  {...rest}
                                />
                              )}
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
                    Ajouter
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
