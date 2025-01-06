import { Monaco, Editor as MonacoEditor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useCallback, useEffect, useState } from "react";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

import {
  AwarenessState,
  awarenessToDecorations,
  awarenessToStyle,
  injectStyles,
  renderDecorations,
} from "@/lib/editor";
import { useLoaderData } from "react-router";
import { Awareness } from "y-protocols/awareness";
import { PermanentUserData } from "yjs";
import { setUpMonacoBinding, setUpWebSocketProvider } from "../utils";
import "./editor.css";

export default function Editor() {
  const { username, colour } = useLoaderData() satisfies {
    username: string;
    colour: string;
  };
  console.log(username, colour);
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const [monaco, setMonaco] = useState<Monaco>();
  const [awareness, setAwareness] = useState<Awareness>();
  const [permanentUserData, setPermanentUserData] =
    useState<PermanentUserData>();
  const [decorations, setDecorations] =
    useState<editor.IEditorDecorationsCollection>();

  useEffect(() => {
    // Initialise the CRDT state and monaco binding
    let wsProvider: WebsocketProvider;
    let yDoc: Y.Doc;
    let binding: MonacoBinding;

    if (editor && monaco) {
      yDoc = new Y.Doc();
      const awareness = new Awareness(yDoc);
      setAwareness(awareness);
      const permanentUserData = new PermanentUserData(yDoc);
      permanentUserData.setUserMapping(yDoc, yDoc.clientID, username);
      setPermanentUserData(permanentUserData);

      wsProvider = setUpWebSocketProvider({
        roomname: "editor-room",
        doc: yDoc,
        awareness,
      });
      binding = setUpMonacoBinding({
        editor,
        doc: yDoc,
        provider: wsProvider,
      });
      setDecorations(editor.createDecorationsCollection());

      return () => {
        setDecorations(undefined);
        binding?.destroy();
        wsProvider?.destroy();
        yDoc?.destroy();
      };
    }
  }, [colour, editor, monaco, username]);

  useEffect(() => {
    // Set up awareness to share user, cursor and selection data.
    if (!awareness || !editor || !monaco) return;

    awareness.setLocalStateField("user", {
      name: username,
      colour,
    });

    editor.onDidChangeCursorPosition((e) => {
      const position = e.position;
      awareness.setLocalStateField("cursor", position);
    });
    editor.onDidChangeCursorSelection((e) => {
      const selection = e.selection;
      awareness.setLocalStateField("selection", selection);
    });

    awareness.on("change", () => {
      if (decorations) {
        let states = [...awareness.getStates().values()] as AwarenessState[];
        states = states.filter(
          (state) => state.user && state.user.name !== username
        );

        injectStyles(awarenessToStyle(states));

        const modelDecorations = awarenessToDecorations(states);
        renderDecorations(decorations, modelDecorations);
      }
    });
  }, [awareness, colour, decorations, editor, monaco, username]);

  const handleOnMount = useCallback(
    (e: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      setEditor(e);
      setMonaco(monaco);
    },
    []
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="javascript"
      onMount={handleOnMount}
    />
  );
}
