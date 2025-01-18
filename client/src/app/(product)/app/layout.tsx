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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SessionSideBar from "@/components/product/sessionSIdeBar";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";

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
      afterSignOutUrl={"http://localhost:3000/"}>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <ReactQueryProvider>
          <SidebarProvider>
            <SessionSideBar />
            <main className="bg-cover bg-center h-screen bg-primaryColor text-textColor w-screen">
              <Navbar />
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </ReactQueryProvider>
      </SignedIn>
    </ClerkProvider>
  );
}
