// app/layout.tsx (root layout)
import type { Metadata } from "next";
import "./globals.css";
import LandingPageFooter from "@/components/landingPage/footer";
import Navbar from "@/components/landingPage/navbar";

export const metadata: Metadata = {
  title: "Kryptos AI",
  description: "This is an app that forecasts the price of stocks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/Logo.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className="h-screen bg-primaryColor bg-cover bg-center text-textColor">
        {/* <Navbar /> */}
        <main className="min-h-screen">{children}</main>
        {/* <LandingPageFooter /> */}
      </body>
    </html>
  );
}
