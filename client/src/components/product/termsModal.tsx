"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { fetchHasAcceptedTerms } from "@/apiFunctions/getFunctions";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export const TermsAndServiceModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["AcceptedTerms"],
    queryFn: () => {
      if (user?.id) {
        return fetchHasAcceptedTerms(user.id);
      }
      throw new Error("User id doesn't exist.");
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (data) {
      setIsOpen(true);
    }
  }, [data]);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Terms & Service</DialogTitle>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            className="rounded-[5px]"
            onCheckedChange={() => {
              setIsChecked(!isChecked);
            }}
            checked={isChecked}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild className="w-16">
            <Button
              variant={"secondary"}
              disabled={!isChecked}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
