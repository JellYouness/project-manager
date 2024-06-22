"use client";

import SettingsNavBar from "@/components/SettingsNavBar";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full items-start gap-4">
      <SettingsNavBar />
      <div className="container max-w-none h-full w-full px-28 py-8 bg-white shadow-xl rounded-xl overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}
