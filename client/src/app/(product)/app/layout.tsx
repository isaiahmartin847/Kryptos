"use client";

import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "@/app/globals.css";
import Navbar from "@/components/product/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SessionSideBar from "@/components/product/sessionSIdeBar";

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
      <SidebarProvider color="black">
        <SessionSideBar />
        <main className="bg-cover bg-center h-screen bg-primaryColor text-textColor w-screen">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </ClerkProvider>
  );
}
