import "./globals.css";
import ReduxProvider from "./ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>{children}</ReduxProvider>
    </html>
  );
}
