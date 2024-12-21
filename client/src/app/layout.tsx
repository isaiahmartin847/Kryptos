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
      <body
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/d0WNTk0Y/Screenshot-from-2024-12-19-16-34-07.png')",
        }}>
        {children}
      </body>
    </html>
  );
}
