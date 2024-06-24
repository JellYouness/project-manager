"use client";
import React, { use, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/api/routes/root/tasks";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  nom: z.string().min(1, { message: "Nom is required" }),
  prenom: z.string().min(1, { message: "Prenom is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

const passwordSchema = z
  .object({
    actuelMotDePasse: z
      .string()
      .min(1, { message: "Current password is required" }),
    nouveauMotDePasse: z
      .string()
      .min(6, { message: "New password must be at least 6 characters long" }),
    confirmerMotDePasse: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.nouveauMotDePasse === data.confirmerMotDePasse, {
    message: "New password and Confirm password must match",
    path: ["confirmerMotDePasse"],
  });

export default function Home() {
  //@ts-ignore
  const { data: user } = useProfileQuery();
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
    },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      actuelMotDePasse: "",
      nouveauMotDePasse: "",
      confirmerMotDePasse: "",
    },
  });

  const onProfileSubmit = async (data: any) => {
    await updateProfile(data);
  };

  const onPasswordSubmit = (data: any) => {
    console.log("Password Data:", data);
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      router.push("/settings");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (user) {
      reset({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      });
    }
  }, [user]);

  return (
    <main>
      <div className="flex w-full flex-col items-start gap-5">
        <div className="flex w-full flex-col items-start gap-1">
          <span className="w-full text-2xl font-bold">Mon Compte</span>
          <span className="w-full text-gray-400">
            Update your profile and personal details here
          </span>
        </div>
        <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-gray-200" />

        <div className="flex w-full flex-col items-start gap-6">
          <span className="text-xl font-semibold">Profile</span>
          <form
            onSubmit={handleProfileSubmit(onProfileSubmit)}
            className="w-full"
          >
            <div className="flex w-full items-center gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="nom">Nom:</Label>
                <Controller
                  name="nom"
                  control={profileControl}
                  render={({ field }) => (
                    <Input {...field} id="nom" placeholder="Nom" />
                  )}
                />
                {profileErrors.nom && <span>{profileErrors.nom.message}</span>}
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="prenom">Prenom:</Label>
                <Controller
                  name="prenom"
                  control={profileControl}
                  render={({ field }) => (
                    <Input {...field} id="prenom" placeholder="Prenom" />
                  )}
                />
                {profileErrors.prenom && (
                  <span>{profileErrors.prenom.message}</span>
                )}
              </div>
            </div>
            <div className="flex w-full items-center gap-4">
              <div className="grid w-full max-w-[49rem] items-center gap-1.5">
                <Label htmlFor="email">Email:</Label>
                <Controller
                  name="email"
                  control={profileControl}
                  render={({ field }) => (
                    <Input {...field} id="email" placeholder="Email" />
                  )}
                />
                {profileErrors.email && (
                  <span>{profileErrors.email.message}</span>
                )}
              </div>
            </div>
            <div className="flex w-full items-center justify-end">
              <Button type="submit">Modifier</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
