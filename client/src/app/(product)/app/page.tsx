"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const Main = () => {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      console.log(user.id);
    }
  });
  return (
    <div className="">
      <div>this is the app and account side</div>
    </div>
  );
};

export default Main;
