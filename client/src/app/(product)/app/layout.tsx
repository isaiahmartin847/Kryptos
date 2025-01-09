"use client";

import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import "@/app/globals.css";

export default function SubdomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="bg-cover bg-center h-screen bg-primaryColor text-textColor">
        <SignedIn>
          <UserButton />
        </SignedIn>
        {children}
      </div>
    </ClerkProvider>
  );
}
