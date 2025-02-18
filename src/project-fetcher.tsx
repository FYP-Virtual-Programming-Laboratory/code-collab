import { useQuery } from "@apollo/client";
import { gql } from "./__generated__";
import { useAppDispatch } from "./app/hooks";
import YObjectsProvider from "./components/y-objects-provider";
import { projectIdSet, userSet } from "./features/global.slice";
import EditorView from "./views/editor";

const GET_PROJECT_AND_USER = gql(`
  query GetProjectAndUser($sessionId: String!, $userId: Int!) {
    project: getProjectBySessionId(sessionId: $sessionId) {
      id
      sessionId
      name
      createdAt
      yDocUpdates
    }
    user: getUser(id: $userId) {
      id
      email
      username
      firstName
      lastName
    }
  }
`);

export default function ProjectFetcher({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: number;
}) {
  const dispatch = useAppDispatch();
  const { data } = useQuery(GET_PROJECT_AND_USER, {
    variables: { sessionId, userId },
    fetchPolicy: "network-only",
    ssr: false,
    onCompleted: (data) => {
      if (data.project) {
        dispatch(projectIdSet({ projectId: data.project.id }));
      }

      if (data.user) {
        dispatch(userSet(data.user));
      }
    },
  });

  if (!data || !data.project || !data.user) return null;

  const { id, yDocUpdates } = data.project;

  return (
    <YObjectsProvider project={{ id, updates: yDocUpdates }}>
      <EditorView projectId={data.project.id} />
    </YObjectsProvider>
  );
}
