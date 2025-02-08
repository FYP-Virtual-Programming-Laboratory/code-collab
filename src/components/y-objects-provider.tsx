import { useAppSelector } from "@/app/hooks";
import { selectProjectId } from "@/features/global.slice";
import { setUpWebSocketProvider } from "@/lib/connections";
import { Position, Selection } from "monaco-editor";
import { ReactNode, useEffect, useMemo } from "react";
import { Awareness } from "y-protocols/awareness.js";
import { Doc, PermanentUserData } from "yjs";
import { YObjectsContext } from "../contexts/y-objects-context";

export type AwarenessState = {
  user: {
    name: string;
    colour: string;
  };
  cursor?: Position;
  selection?: Selection;
};

export default function YObjectsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const projectId = useAppSelector(selectProjectId);
  const doc = useMemo(() => new Doc(), []);
  const awareness = useMemo(() => new Awareness(doc), [doc]);
  const userData = useMemo(() => new PermanentUserData(doc), [doc]);
  const wsProvider = useMemo(
    () =>
      setUpWebSocketProvider(projectId?.toString() ?? "", {
        awareness,
        doc,
      }),
    [projectId, awareness, doc]
  );

  useEffect(() => {
    return () => {
      wsProvider.destroy();
      doc.destroy();
      awareness.destroy();
    };
  }, [wsProvider, doc, awareness]);

  return (
    <YObjectsContext.Provider
      value={{ doc, awareness, userData, providers: { websocket: wsProvider } }}
    >
      {children}
    </YObjectsContext.Provider>
  );
}
