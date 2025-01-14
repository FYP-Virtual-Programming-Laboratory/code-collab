import { Position, Selection } from "monaco-editor";
import { Awareness } from "y-protocols/awareness.js";
import { Doc, PermanentUserData } from "yjs";

export const yDoc = new Doc();

export type AwarenessState = {
  user: {
    name: string;
    colour: string;
  };
  cursor?: Position;
  selection?: Selection;
};

export const awareness = new Awareness(yDoc);

export const permanentUserData = new PermanentUserData(yDoc);
// permanentUserData.setUserMapping(yDoc, yDoc.clientID, username); Should be done when user is initialised.
