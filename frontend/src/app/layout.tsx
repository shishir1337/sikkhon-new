import * as React from "react";
import { Metadata } from "next";
import ClientWrapper from "@/components/ClientWrapper";

import "@/styles/globals.css";
import "@/styles/colors.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Sikkhon",
  description: "Sikkhon - Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-primary">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

