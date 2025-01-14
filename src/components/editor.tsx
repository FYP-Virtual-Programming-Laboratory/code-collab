import { Editor as MonacoEditor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useCallback, useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";

import { setUpWebSocketProvider } from "@/lib/connections";
import {
  awarenessToDecorations,
  awarenessToStyle,
  injectStyles,
  renderDecorations,
} from "@/lib/editor";
import { FileNode } from "@/lib/file-tree";
import { awareness, AwarenessState, yDoc } from "@/lib/y-objects";
import { useLoaderData } from "react-router";
import "./editor.css";

type EditorProps = {
  file: FileNode | null;
};

export default function Editor({ file }: Readonly<EditorProps>) {
  const { username, colour } = useLoaderData() satisfies {
    username: string;
    colour: string;
  };
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const [decorations, setDecorations] =
    useState<editor.IEditorDecorationsCollection>();

  useEffect(() => {
    if (!file || !editor) return;

    editor.setModel(file.getBinding().monacoModel);
  }, [editor, file]);

  useEffect(() => {
    let wsProvider: WebsocketProvider;

    if (editor) {
      wsProvider = setUpWebSocketProvider("editor-room");
      setDecorations(editor.createDecorationsCollection());

      return () => {
        setDecorations(undefined);
        wsProvider?.destroy();
        yDoc?.destroy();
      };
    }
  }, [colour, editor, username]);

  useEffect(() => {
    // Set up awareness to share user, cursor and selection data.
    if (!awareness || !editor) return;

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
  }, [colour, decorations, editor, username]);

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditor(e);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!file) return null;

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="javascript"
      onMount={handleOnMount}
      loading=""
    />
  );
}
