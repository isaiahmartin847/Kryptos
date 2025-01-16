"use client";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const Main = () => {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      console.log(user.id);
    }
  });
  return (
    <SignedIn>
      {/* <div>
        <div>this is the app and account side</div>
      </div> */}
    </SignedIn>
  );
};

export default Main;
