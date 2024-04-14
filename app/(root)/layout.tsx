import React, { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return <main>{children}</main>;
};

export default RootLayout;
