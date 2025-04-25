import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { ToastContainer } from "@/components/ToastContainer";

export const metadata: Metadata = {
  title: "Home Broker",
  description: "Compra e venda de ativos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`h-screen flex flex-col`}>
        <Navbar />
        <div className="container mx-auto flex flex-grow px-4">{children}</div>
        <ToastContainer />
      </body>
    </html>
  );
}
