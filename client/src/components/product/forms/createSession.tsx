import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

interface Props {
  children?: React.ReactNode;
}

interface CreateBrandForm {
  State: string;
  Species: string;
  HuntingUnit: string;
}

const CreateSessionForm = ({ children }: Props) => {
  const schema = z.object({
    State: z.string().nonempty("State cannot be empty"),
    Species: z.string().nonempty("Species cannot be empty"),
    HuntingUnit: z.string().nonempty("Hunting Unit cannot be empty"),
  });

  const form = useForm<CreateBrandForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      State: "",
      Species: "",
      HuntingUnit: "",
    },
  });

  const openStates = {
    MT: "Montana",
  };

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="State"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a state.</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(openStates).map(([value, label]) => (
                      <SelectItem
                        key={value}
                        value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          {children}
          <Button
            type="submit"
            variant={"secondary"}>
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateSessionForm;
