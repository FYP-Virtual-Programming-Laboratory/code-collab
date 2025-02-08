import { Awareness } from "y-protocols/awareness.js";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

export function setUpWebSocketProvider(
  roomname: string,
  yObjects: {
    awareness: Awareness;
    doc: Doc;
  }
) {
  const { awareness, doc } = yObjects;
  const wsProvider = new WebsocketProvider(
    "ws://localhost:1234",
    roomname,
    doc,
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
