import type { Metadata } from "next";
import "@/app/globals.css";
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
      <body className="bg-cover bg-center h-screen bg-white">{children}</body>
    </html>
  );
}
