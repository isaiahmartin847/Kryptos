import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reg-Maps",
  description: "This is an app for getting regulations for hunting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
