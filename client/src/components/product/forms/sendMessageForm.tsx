import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";

interface sendMessageForm {
  inputMessage: string;
}

const SendMessageForm = () => {
  const form = useForm<sendMessageForm>({
    defaultValues: {
      inputMessage: "",
    },
  });

  const onSubmit = (values: sendMessageForm) => {
    console.log(values.inputMessage);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-between p-2">
        <FormField
          control={form.control}
          name="inputMessage"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className=""
                  placeholder="this is the input box"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button
            variant={"secondary"}
            type="submit">
            <Send />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SendMessageForm;
