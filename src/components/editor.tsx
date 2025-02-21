import { Editor as MonacoEditor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useCallback, useEffect, useState } from "react";

import { useAppSelector } from "@/app/hooks";
import { selectProfile } from "@/features/global.slice";
import { useYObjects } from "@/hooks/use-y-objects";
import {
  awarenessToDecorations,
  awarenessToStyle,
  injectStyles,
  renderDecorations,
} from "@/lib/editor";
import { FileNode } from "@/lib/file-system/file-node";
import { cn } from "@/lib/utils";
import "./editor.css";
import { AwarenessState } from "./y-objects-provider";

type EditorProps = {
  file: FileNode | null;
};

export default function Editor({ file }: Readonly<EditorProps>) {
  const profile = useAppSelector(selectProfile);
  const username = profile.user.username;

  const [monacoEditor, setMonacoEditor] =
    useState<editor.IStandaloneCodeEditor>();
  const [decorations, setDecorations] =
    useState<editor.IEditorDecorationsCollection>();
  const { awareness } = useYObjects();

  useEffect(() => {
    if (!monacoEditor || !file) return;

    monacoEditor.setModel(file.getBinding().monacoModel);
  }, [monacoEditor, file]);

  useEffect(() => {
    if (monacoEditor) {
      setDecorations(monacoEditor.createDecorationsCollection());

      return () => {
        setDecorations(undefined);
      };
    }
  }, [monacoEditor]);

  useEffect(() => {
    // Set up awareness to share user, cursor and selection data.
    if (!monacoEditor) return;

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
  }, [awareness, decorations, monacoEditor, username]);

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
