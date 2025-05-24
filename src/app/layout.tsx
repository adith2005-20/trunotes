import "@/styles/globals.css";
import { Providers } from "./providers";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Trunotes",
  description: "Notetaking on the go",
  icons: [{ rel: "icon", url: "/trunotes-logo-sm.svg" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="dark">
        <TRPCReactProvider>
          <Providers><Header/>{children}</Providers>
          <Toaster position="bottom-left" />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
