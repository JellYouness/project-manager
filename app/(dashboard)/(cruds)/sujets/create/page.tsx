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
import { useCreateSujetMutation } from "@/api/routes/crud/sujets";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  nom: z.string().min(2, {
    message: "Nom must be at least 2 characters.",
  }),
  document: z.any(),
});

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const [createSujet, { isSuccess }] = useCreateSujetMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nom: "",
      document: "",
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("file", file);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("data", file);
    if (file) {
      const formData = new FormData();
      formData.append("nom", data.nom);
      formData.append("document", file);
      await createSujet(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Sujet ajouté avec succès", {
        variant: "success",
      });
      router.push("/sujets");
    }
  }, [isSuccess, enqueueSnackbar, router]);

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
                      name="document"
                      render={({ field: { onChange, ...rest } }) => (
                        <FormItem>
                          <FormLabel>Document</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="document"
                              type="file"
                              accept=".pdf"
                              onChange={handleFileChange}
                              {...rest}
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
