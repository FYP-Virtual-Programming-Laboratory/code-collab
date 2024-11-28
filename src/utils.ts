import { TinyColor } from "@ctrl/tinycolor";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness.js";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

export function setUpWebSocketProvider({
  roomname,
  doc,
  awareness,
}: {
  roomname: string;
  doc: Doc;
  awareness: Awareness;
}) {
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

export function setUpMonacoBinding({
  editor,
  doc,
  provider,
}: {
  editor: editor.IStandaloneCodeEditor;
  doc: Doc;
  provider: WebsocketProvider;
}) {
  const yText = doc.getText("monaco");
  const model = editor.getModel() as editor.ITextModel;

  return new MonacoBinding(yText, model, new Set([editor]), provider.awareness);
}

/**
 * Check if a colour is considered light or dark.
 * @param colour Hex colour code
 * @returns true if the colour is considered light, false otherwise
 */
export function isLightColour(colour: string) {
  const _colour = new TinyColor(colour);
  return _colour.isLight();
}
