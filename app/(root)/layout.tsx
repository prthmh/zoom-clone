import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Voom - Zoom Clone",
  description: "Voom a video calling app.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
