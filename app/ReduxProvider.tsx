"use client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { baseApi, store } from "@/api/baseApi";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";

const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
      <Provider store={store}>{children}</Provider>
  );
};

export default ReduxProvider;
