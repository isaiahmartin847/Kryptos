import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reg-Maps",
  description: "This is an app for getting regulations for hunting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can add custom <head> tags here if needed */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body className="bg-cover bg-center h-screen bg-primaryColor text-textColor">
        {children}
      </body>
    </html>
  );
}
