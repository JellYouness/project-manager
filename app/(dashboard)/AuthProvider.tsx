"use client";
import { usePathname, useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      // Redirect to login page
      router.push("/login");
    }

    if (window.localStorage.getItem("user")) {
      const userType = JSON.parse(
        window.localStorage.getItem("user") as string
      )?.type;
      if (
        (userType === "etudiant" &&
          (pathName === "/etudiants" ||
            pathName === "/enseignants" ||
            pathName === "/sujets" ||
            pathName === "/groupes")) ||
        (userType === "encadrant" &&
          (pathName === "/etudiants" ||
            pathName === "/enseignants" ||
            pathName === "/sujets" ||
            pathName === "/groupes")) ||
        (userType === "admin" &&
          (pathName === "/tasks" || pathName === "/chat"))
      ) {
        // Redirect to login page
        router.push("/login");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className="flex h-screen flex-1">{children}</div>
    </SnackbarProvider>
  );
};

export default AuthProvider;
