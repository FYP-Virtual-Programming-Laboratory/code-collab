import { Awareness } from "y-protocols/awareness.js";
import { WebrtcProvider } from "y-webrtc";
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
      switch (event.status) {
        case "connected":
          console.debug("WebSocket connection established.");
          break;
        case "disconnected":
          console.debug("WebSocket connection lost.");
          break;
        case "connecting":
          console.debug("WebSocket is connecting...");
          break;
      }
    }
  );

  return wsProvider;
}

export function setUpWebRTCProvider(
  roomname: string,
  yObjects: {
    awareness: Awareness;
    doc: Doc;
  }
) {
  const { awareness, doc } = yObjects;
  const webRtcProvider = new WebrtcProvider(roomname, doc, {
    awareness,
    signaling: ["ws://localhost:4444"],
    password: "passybobo",
  });
  webRtcProvider.on("status", (event) => {
    switch (event.connected) {
      case true:
        console.debug("WebRTC connection established.");
        break;
      case false:
        console.debug("WebRTC connection lost.");
        break;
    }
  });

  return webRtcProvider;
}
