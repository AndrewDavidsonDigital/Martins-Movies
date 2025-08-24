import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ReactNode } from 'react';

import "@/style/main.css";
import "@/app/globals";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arcadian Digital - Movies & Shows",
  description: "Discover and explore the latest movies and TV shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" id="scrollRoot">
      <body
        className={`${quicksand.variable} antialiased overflow-x-clip`}
      >
        {children}
      </body>
    </html>
  );
}
