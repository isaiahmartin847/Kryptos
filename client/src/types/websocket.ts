interface Payload {
  role: string;
  message: string;
}

export interface SendMessage {
  type: "chat" | "echo";
  payload: Payload;
}

export interface ResponseMessage {
  type: string;
  payload: Payload;
}
