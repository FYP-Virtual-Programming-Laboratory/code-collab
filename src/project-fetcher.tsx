import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { applyUpdateV2 } from "yjs";
import { gql } from "./__generated__";
import { useAppDispatch } from "./app/hooks";
import { projectIdSet } from "./features/global.slice";
import { base64ToBytes } from "./lib/utils";
import { yDoc } from "./lib/y-objects";
import EditorView from "./views/editor";

const GET_PROJECT_BY_SESSION_ID = gql(`
  query GetProjectBySessionId($sessionId: String!) {
    getProjectBySessionId(sessionId: $sessionId) {
      id
      name
      createdAt
      yDocUpdates
    }
  }
`);

export default function ProjectFetcher({ sessionId }: { sessionId: string }) {
  const { data } = useQuery(GET_PROJECT_BY_SESSION_ID, {
    variables: { sessionId },
    fetchPolicy: "network-only",
    ssr: false,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && data.getProjectBySessionId) {
      dispatch(projectIdSet({ projectId: data.getProjectBySessionId.id }));
      applyUpdateV2(
        yDoc,
        base64ToBytes(data.getProjectBySessionId.yDocUpdates)
      );
    }
  }, [data, dispatch]);

  if (!data || !data.getProjectBySessionId) return null;

  return <EditorView projectId={data.getProjectBySessionId.id} />;
}
