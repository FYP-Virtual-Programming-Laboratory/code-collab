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
import { FileNode } from "@/lib/file-node";
import { cn } from "@/lib/utils";
import { awareness, AwarenessState, yDoc } from "@/lib/y-objects";
import "./editor.css";

type EditorProps = {
  file: FileNode | null;
};

export default function Editor({ file }: Readonly<EditorProps>) {
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const username = profile.username;
  const colour = profile.colour;

  const [monacoEditor, setMonacoEditor] =
    useState<editor.IStandaloneCodeEditor>();
  const [decorations, setDecorations] =
    useState<editor.IEditorDecorationsCollection>();

  useEffect(() => {
    if (!monacoEditor || !file) return;

    monacoEditor.setModel(file.getBinding().monacoModel);
  }, [monacoEditor, file]);

  useEffect(() => {
    let wsProvider: WebsocketProvider;

    if (monacoEditor) {
      wsProvider = setUpWebSocketProvider("editor-room");
      setDecorations(monacoEditor.createDecorationsCollection());

      return () => {
        setDecorations(undefined);
        wsProvider?.destroy();
        yDoc?.destroy();
      };
    }
  }, [colour, monacoEditor, username]);

  useEffect(() => {
    // Set up awareness to share user, cursor and selection data.
    if (!awareness || !monacoEditor) return;

    awareness.setLocalStateField("user", {
      name: username,
      colour,
    });

    monacoEditor.onDidChangeCursorPosition((e) => {
      const position = e.position;
      awareness.setLocalStateField("cursor", position);
    });
    monacoEditor.onDidChangeCursorSelection((e) => {
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
  }, [colour, decorations, monacoEditor, username]);

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setMonacoEditor(e);
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

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="javascript"
      onMount={handleOnMount}
      loading=""
      className={cn({ hidden: !file })}
    />
  );
}
