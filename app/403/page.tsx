import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <body className={inter.className}>
      <div className="flex items-center justify-center size-full">
        <h1>403 Forbidden</h1>
        <p>Sorry, you don&apos;t have permission to access this page.</p>
      </div>
    </body>
  );
}
