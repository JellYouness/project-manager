"use client";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Logo from "@/public/logo.svg";

//TODO: Add validation to the form

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
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      cin: "",
      cne: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="container max-w-none flex h-screen w-full flex-col items-center justify-center gap-2 bg-gray-100">
      <div className="flex w-full lg:max-w-2xl flex-col items-center justify-center gap-8 rounded border border-solid border-neutral-border bg-white p-6 lg:p-12 shadow-xl">
        <div className="flex items-center gap-2">
          <Image className="w-12 flex-none" src={Logo} alt="" />
          <h1 className="text-3xl font-bold">Manager</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

            <button
              type="submit"
              className="h-10 w-full flex-none btn btn-active btn-neutral"
            >
              S'inscrire
            </button>
          </form>
        </Form>
        <div className="flex w-full items-center justify-center gap-2">
          <div className="flex h-px w-full grow shrink-0 basis-0 flex-col items-center gap-2 bg-gray-200" />
          <span className="text-base text-gray-400">ou</span>
          <div className="flex h-px w-full grow shrink-0 basis-0 flex-col items-center gap-2 bg-gray-200" />
        </div>
        <Link href="/login">
          <button className="btn btn-active btn-link btn-sm">
            Se Connecter
          </button>
        </Link>
      </div>
    </div>
  );
}
