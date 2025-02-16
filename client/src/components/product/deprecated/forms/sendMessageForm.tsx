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
import { useWebSocketContext } from "@/providers/websocketProvider";
import { SendMessage } from "@/types/websocket";
import { LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";

interface sendMessageForm {
  inputMessage: string;
}

const SendMessageForm = () => {
  const { sendMessage, isLoading, isConnected } = useWebSocketContext();

  const form = useForm<sendMessageForm>({
    defaultValues: {
      inputMessage: "",
    },
  });

  const onSubmit = (values: sendMessageForm) => {
    console.log(values.inputMessage);

    const message: SendMessage = {
      type: "chat",
      payload: {
        role: "user",
        message: values.inputMessage,
      },
    };

    sendMessage(message);
    form.reset({ inputMessage: "" });
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
                  className="placeholder:text-mutedColor text-wrap"
                  placeholder="Message"
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
            disabled={!isConnected}
            variant={"secondary"}
            type="submit">
            {isLoading && isConnected ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Send />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SendMessageForm;
