"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchHasAcceptedTerms,
  fetchTermsAndConditions,
} from "@/apiFunctions/getFunctions";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { signTerms } from "@/apiFunctions/postFunctions";
import { Loader2 } from "lucide-react";

export const TermsAndConditions = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { user } = useUser();

  const { data: hasTermsData } = useQuery({
    queryKey: ["AcceptedTerms"],
    queryFn: () => {
      if (user?.id) {
        return fetchHasAcceptedTerms(user.id);
      }
      throw new Error("User id doesn't exist.");
    },
    enabled: !!user?.id,
  });

  const { data: termsData } = useQuery({
    queryKey: ["terms"],
    queryFn: fetchTermsAndConditions,
    enabled: !hasTermsData?.data.item?.has_accepted_terms,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["singTerms"],
    mutationFn: () => {
      if (!user?.id || !termsData?.data.item?.id) {
        throw new Error("unable to accept terms due to missing ID's");
      }
      return signTerms(user?.id, termsData?.data.item?.id);
    },
    onSuccess: () => setIsOpen(false),
  });

  const handleClick = () => {
    if (!isChecked) {
      console.log("must agree to terms");
      return;
    }
    mutate();
  };

  useEffect(() => {
    if (hasTermsData?.data && !hasTermsData.data.item?.has_accepted_terms) {
      setIsOpen(true);
    }
  }, [hasTermsData]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-[470px] [&>button]:hidden">
        <DialogTitle>Terms & Conditions</DialogTitle>
        <div>{termsData?.data.item?.content}</div>
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
              onClick={handleClick}
            >
              {!isPending ? "Close" : <Loader2 className="animate-spin" />}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
