import { useQuery } from "@apollo/client";
import { gql } from "./__generated__";
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

  if (!data || !data.getProjectBySessionId) return null;

  return <EditorView projectId={data.getProjectBySessionId.id} />;
}
