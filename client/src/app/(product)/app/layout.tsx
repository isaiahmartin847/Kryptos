"use client";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "@/app/globals.css";
import Navbar from "@/components/product/navbar";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";
import { StocksProvider } from "@/providers/stocksProvider";
import { Toaster } from "@/components/ui/toaster";

import { TermsAndConditions } from "@/components/product/termsModal";

export default function SubdomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homeUrl = process.env.NEXT_PUBLIC_HOST_URL;
  const prefix = process.env.NODE_ENV === "development" ? "http" : "https";

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      afterSignOutUrl={`${prefix}://${homeUrl}/`}
    >
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <ReactQueryProvider>
          <StocksProvider>
            <Toaster></Toaster>
            <main className="h-screen w-screen bg-primaryColor bg-cover bg-center text-textColor">
              <TermsAndConditions />
              <Navbar />
              {children}
            </main>
          </StocksProvider>
        </ReactQueryProvider>
      </SignedIn>
    </ClerkProvider>
  );
}
