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
import { SavedStockProvider } from "@/providers/savedStocksProvider";

export default function SubdomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      // TODO update this with the real redirect url
      afterSignOutUrl={"http://localhost:3000/"}
    >
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <ReactQueryProvider>
          <SavedStockProvider>
            <main className="h-screen w-screen bg-primaryColor bg-cover bg-center text-textColor">
              <Navbar />
              {children}
            </main>
          </SavedStockProvider>
        </ReactQueryProvider>
      </SignedIn>
    </ClerkProvider>
  );
}
