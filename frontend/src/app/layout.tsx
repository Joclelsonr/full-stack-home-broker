import type { Metadata } from "next";
import "./globals.css";

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
        <div className="container mx-auto flex flex-grow px-4">{children}</div>
      </body>
    </html>
  );
}
