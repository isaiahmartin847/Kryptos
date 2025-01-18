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

  const states = {
    MT: "Montana",
  };

  const huntingUnits = {
    200: "200",
    220: "220",
    230: "230",
    300: "300",
    320: "320",
    330: "330",
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log({
      State: values.State,
      Species: values.Species,
      HuntingUnit: values.HuntingUnit,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="State"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a state.</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(states).map(([value, label]) => (
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

        <FormField
          control={form.control}
          name="HuntingUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a hunting unit.</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a hunting unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(huntingUnits).map(([value, label]) => (
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
        <div>
          {children}
          <button type="submit">Create</button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSessionForm;
