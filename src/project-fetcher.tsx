import { useQuery } from "@apollo/client";
import { gql } from "./__generated__";
import { useAppDispatch } from "./app/hooks";
import YObjectsProvider from "./components/y-objects-provider";
import { projectIdSet } from "./features/global.slice";
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
  const dispatch = useAppDispatch();
  const { data } = useQuery(GET_PROJECT_BY_SESSION_ID, {
    variables: { sessionId },
    fetchPolicy: "network-only",
    ssr: false,
    onCompleted: (data) => {
      if (data.getProjectBySessionId) {
        dispatch(projectIdSet({ projectId: data.getProjectBySessionId.id }));
      }
    },
  });

  if (!data || !data.getProjectBySessionId) return null;

  const { id, yDocUpdates } = data.getProjectBySessionId;

  return (
    <YObjectsProvider project={{ id, updates: yDocUpdates }}>
      <EditorView projectId={data.getProjectBySessionId.id} />
    </YObjectsProvider>
  );
}
