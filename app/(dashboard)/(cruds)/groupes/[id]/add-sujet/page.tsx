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
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete, TextField } from "@mui/material";
import {
  useAssignSujetMutation,
  useGetSujetsQuery,
} from "@/api/routes/crud/sujets";

const FormSchema = z.object({
  sujet_id: z.number(),
  date_debut: z.string(),
  date_fin: z.string(),
  description: z.string(),
});

export default function Home({ params }: { params: { id: number } }) {
  const { enqueueSnackbar } = useSnackbar();
  const [assignSujet, { isSuccess }] = useAssignSujetMutation();
  const { data: sujets } = useGetSujetsQuery();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sujet_id: undefined,
      date_debut: "",
      date_fin: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await assignSujet({ id: params.id, ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Sujet assigné avec succès", {
        variant: "success",
      });
      router.push("/groupes");
    }
  }, [isSuccess, enqueueSnackbar, router]);

  return (
    <main>
      <Card className="p-4">
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-2xl font-bold">
              Assigner Sujet - id:{params.id}
            </span>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />
          <div className="flex w-full flex-col items-start gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <div className="flex w-full items-center gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="sujet_id"
                      render={({ field }) => (
                        <FormItem className="flex items-start flex-col">
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Controller
                              name="sujet_id"
                              control={form.control}
                              render={({
                                field: { onChange, value, ...rest },
                              }) => (
                                <Autocomplete
                                  className="w-full"
                                  options={sujets || []}
                                  getOptionLabel={(option: any) =>
                                    option.nom || ""
                                  }
                                  value={
                                    sujets
                                      ? sujets.find(
                                          (sujet: any) => sujet.id === value
                                        ) || null
                                      : null
                                  }
                                  onChange={(_, data) => {
                                    onChange(data?.id || "");
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      placeholder="Sélectionner un sujet"
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
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="date_debut"
                      render={({ field }) => (
                        <FormItem className="flex items-start flex-col">
                          <FormLabel>Date de début</FormLabel>
                          <FormControl>
                            <Controller
                              name="date_debut"
                              control={form.control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  className="w-full"
                                  type="date"
                                  placeholder="Date de début"
                                />
                              )}
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
                      name="date_fin"
                      render={({ field }) => (
                        <FormItem className="flex items-start flex-col">
                          <FormLabel>Date de fin</FormLabel>
                          <FormControl>
                            <Controller
                              name="date_fin"
                              control={form.control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  className="w-full"
                                  type="date"
                                  placeholder="Date de fin"
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
                <div className="flex w-full items-center gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="flex items-start flex-col w-full">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Controller
                              name="description"
                              control={form.control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  className="w-full"
                                  multiline
                                  rows={3}
                                  placeholder="Description"
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
                    Assigner
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
