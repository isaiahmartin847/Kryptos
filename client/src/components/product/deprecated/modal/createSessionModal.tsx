import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import CreateSessionForm from "../forms/createSession";

const CreateSessionModal = () => {
  return (
    <div className="w-ful flex h-[87vh] items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>
            <Plus strokeWidth={4} className="m-0 p-0" />
            Create Session
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Create a session</DialogTitle>
          <CreateSessionForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateSessionModal;
