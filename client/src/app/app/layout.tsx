"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
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
          {/* You can add custom <head> tags here if needed */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
        </head>
        <body className="bg-cover bg-center h-screen bg-primaryColor text-textColor">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
