import type { Metadata } from "next";
import "./globals.css";
import LandingPageFooter from "@/components/landingPage/footer";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* You can add custom <head> tags here if needed */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>

      <body className="bg-cover bg-center h-screen bg-primaryColor text-textColor">
        <main className="min-h-screen">{children}</main>
        <LandingPageFooter />
      </body>
    </html>
  );
}
