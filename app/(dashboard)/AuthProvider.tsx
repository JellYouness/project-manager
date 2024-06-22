"use client";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { token, user } = useSelector((state: any) => state.auth);
  const localToken = localStorage.getItem("token");
  const router = useRouter();
  useEffect(() => {
    if (token === null && localToken === null) {
      // Redirect to login page
      router.push("/login");
    }
  }, [token, router, localToken]);

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
