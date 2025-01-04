"use client";
import { useEffect } from "react";
import { Clerk } from "@clerk/clerk-js";

const frontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!frontendApi) {
  throw new Error(
    "NEXT_PUBLIC_CLERK_FRONTEND_API is not defined in your environment variables."
  );
}

const clerk = new Clerk(frontendApi);

export default function LandingPage() {
  useEffect(() => {
    (async () => {
      try {
        await clerk.load();

        const user = await clerk.user;
        if (user) {
          window.location.href = "http://app.localhost:3000";
        } else {
          clerk.redirectToSignIn();
        }
      } catch (error) {
        console.error("Error loading Clerk:", error);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
