"use client";

import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
        </head>
        <body className="bg-cover bg-center h-screen bg-primaryColor text-textColor">
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
