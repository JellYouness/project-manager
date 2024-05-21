"use client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { baseApi } from "@/api/baseApi";

const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ApiProvider api={baseApi}>{children}</ApiProvider>;
};

export default ReduxProvider;
