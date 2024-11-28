import { Monaco, Editor as MonacoEditor } from "@monaco-editor/react";
import { editor, Position, Range, Selection } from "monaco-editor";
import { useCallback, useEffect, useState } from "react";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

import { TinyColor } from "@ctrl/tinycolor";
import { useLoaderData } from "react-router-dom";
import { Awareness } from "y-protocols/awareness";
import { setUpMonacoBinding, setUpWebSocketProvider } from "../utils";
import "./editor.css";

type AwarenessState = {
  user: {
    name: string;
    colour: string;
  };
  cursor?: Position;
  selection?: Selection;
};

function cursorToDecoration(cursor: Position, username: string) {
  return {
    range: new Range(
      cursor.lineNumber,
      cursor.column,
      cursor.lineNumber,
      cursor.column
    ),
    options: {
      className: `my-cursor my-cursor-${username}`,
      after: {
        content: username,
      },
    },
  } satisfies editor.IModelDeltaDecoration;
}

function selectionToDecoration(selection: Selection, username: string) {
  return {
    range: new Range(
      selection.startLineNumber,
      selection.startColumn,
      selection.endLineNumber,
      selection.endColumn
    ),
    options: {
      className: `my-selection my-selection-${username}`,
    },
  } satisfies editor.IModelDeltaDecoration;
}

function renderDecorations(
  decorationsCollection: editor.IEditorDecorationsCollection,
  decorations: editor.IModelDeltaDecoration[]
) {
  decorationsCollection.clear();
  return decorationsCollection.set(decorations);
}

function awarenessToDecorations(
  awareness: Awareness,
  username: string
): editor.IModelDeltaDecoration[] {
  const clientStates = [...awareness.getStates().values()] as AwarenessState[];
  return clientStates
    .filter((state) => state.user.name !== username)
    .flatMap((state) => {
      const { cursor, selection } = state;

      const modelDecorations = [];

      if (cursor) modelDecorations.push(cursorToDecoration(cursor, username));
      if (selection)
        modelDecorations.push(selectionToDecoration(selection, username));

      return modelDecorations;
    });
}

export default function Editor() {
  const { username, colour } = useLoaderData() as {
    username: string;
    colour: string;
  };
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const [monaco, setMonaco] = useState<Monaco>();
  const [awareness, setAwareness] = useState<Awareness>();
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
        injectStyles(awarenessToStyle(awareness));

        const modelDecorations = awarenessToDecorations(awareness, username);
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

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="javascript"
      onMount={handleOnMount}
    />
  );
}

function awarenessToStyle(awareness: Awareness) {
  const decorationStyles: string[] = [];
  const clientStates = [...awareness.getStates().values()] as AwarenessState[];
  clientStates.forEach((state) => {
    const { user, cursor, selection } = state;

    const colour = new TinyColor(user.colour);
    const cursorTextColour = colour.isLight() ? "black" : "white";
    const baseBgColour = colour.brighten(30).toHexString();
    const activeBgColour = user.colour;

    if (cursor) {
      decorationStyles.push(
        `.my-cursor-${user.name} { position: relative; background-color: ${activeBgColour}; color: ${cursorTextColour}; z-index: 1; }`
      );
      decorationStyles.push(
        `.my-cursor-${user.name}::after { position: absolute; top: 1.4em; content: '${user.name}'; font-size: 0.8em; background-color: ${baseBgColour}; border-radius: 0.4em; padding: 0px 0.2em; }`
      );
      decorationStyles.push(
        `.my-cursor-${user.name}:hover::after { background-color: ${activeBgColour}; }`
      );
    }
    if (selection) {
      decorationStyles.push(
        `.my-selection-${user.name} { background-color: ${baseBgColour}; }`
      );
    }
  });

  return decorationStyles.join("\n");
}

function injectStyles(styles: string) {
  const styleId = "monaco-decorations";
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  styleElement.innerHTML = styles;
}
