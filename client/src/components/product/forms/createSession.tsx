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

interface Props {
  handleSubmit: () => void;
  children?: React.ReactNode;
}

interface CreateBrandForm {
  State: string;
  Species: string;
  HuntingUnit: string;
}

const DeleteBrandForm = ({ handleSubmit, children }: Props) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="State"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a state.</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-2">
          {children}
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
};

export default DeleteBrandForm;
