import { WebsocketProvider } from "y-websocket";
import { awareness, yDoc } from "./y-objects";

export function setUpWebSocketProvider(roomname: string) {
  const wsProvider = new WebsocketProvider(
    "ws://localhost:1234",
    roomname,
    yDoc,
    {
      awareness,
    }
  );
  wsProvider.on(
    "status",
    (event: { status: "disconnected" | "connecting" | "connected" }) => {
      console.log(event.status);
    }
  );

  return wsProvider;
}
