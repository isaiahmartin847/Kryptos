"use client";
import { Clerk } from "@clerk/clerk-js";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const clerkPublicKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkPublicKey) {
  throw new Error(
    "NEXT_PUBLIC_CLERK_FRONTEND_API is not defined in your environment variables."
  );
}

const clerk = new Clerk(clerkPublicKey);

const SignUpPage = () => {
  const router = useRouter();

  useEffect(() => {
    const clerkRedirection = async () => {
      try {
        await clerk.load();
        const user = clerk.user;

        if (user) {
          console.log("User is logged in");
          router.push("http://app.localhost:3000");
        } else {
          console.log("User is not logged in");
          clerk.redirectToSignUp();
        }
      } catch (error) {
        console.error(`Error loading Clerk client: ${error}`);
      }
    };

    clerkRedirection();
  }, [router]);

  return <div>loading...</div>;
};

export default SignUpPage;
