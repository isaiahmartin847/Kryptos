"use client";

import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import "@/app/globals.css";
import Navbar from "@/components/product/navbar";

export default function SubdomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SignedIn>
        <Navbar />
        <div className="bg-cover bg-center h-screen bg-primaryColor text-textColor">
          {children}
        </div>
      </SignedIn>
    </ClerkProvider>
  );
}
