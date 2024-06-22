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
import { useToast } from "@/components/ui/use-toast";
import { AtSign, KeyRound } from "lucide-react";
import Logo from "@/public/logo.svg";
import { useLoginMutation } from "@/api/routes/auth/auth";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";

//TODO: Add validation to the form

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

export default function Home() {
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "etudiant@gmail.com",
      password: "admin",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await login(data);
  }

  useEffect(() => {
    if(isSuccess) {
      router.push("/");
    }
  },[isSuccess, router])

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className="container max-w-none flex h-screen w-full flex-col items-center justify-center gap-2 bg-gray-100">
        <div className="flex w-full max-w-[384px] flex-col items-center justify-center gap-8 rounded border border-solid border-neutral-border bg-white p-6 lg:p-12 shadow-xl">
          <div className="flex items-center gap-2">
            <Image className="w-12 flex-none" src={Logo} alt="" />
            <h1 className="text-3xl font-bold">Manager</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input icon={AtSign} placeholder="Email" {...field} />
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
                    <FormControl>
                      <Input
                        icon={KeyRound}
                        placeholder="Mot de passe"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-10 w-full flex-none btn btn-active btn-neutral"
              >
                Se connecter
              </button>
            </form>
          </Form>
          <div className="flex w-full items-center justify-center gap-2">
            <div className="flex h-px w-full grow shrink-0 basis-0 flex-col items-center gap-2 bg-gray-200" />
            <span className="text-base text-gray-400">ou</span>
            <div className="flex h-px w-full grow shrink-0 basis-0 flex-col items-center gap-2 bg-gray-200" />
          </div>
          <Link href="/signup">
            <button className="btn btn-active btn-link btn-sm">Sign up</button>
          </Link>
        </div>
      </div>
    </SnackbarProvider>
  );
}
