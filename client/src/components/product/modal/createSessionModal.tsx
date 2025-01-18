import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import CreateSessionForm from "../forms/createSession";

const CreateSessionModal = () => {
  return (
    <div className="flex justify-center items-center w-ful h-[87vh]">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>
            <Plus
              strokeWidth={4}
              className="p-0 m-0"
            />
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
