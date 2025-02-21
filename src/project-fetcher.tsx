import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./app/hooks";
import YObjectsProvider from "./components/y-objects-provider";
import {
  projectSet,
  selectProject,
  selectUser,
  userSet,
} from "./features/global.slice";
import { GET_PROJECT_AND_USER } from "./gql/queries";
import EditorView from "./views/editor";

export default function ProjectFetcher({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: number;
}) {
  const dispatch = useAppDispatch();
  const project = useSelector(selectProject);
  const user = useSelector(selectUser);
  const { data } = useQuery(GET_PROJECT_AND_USER, {
    variables: { sessionId, userId },
    fetchPolicy: "network-only",
    ssr: false,
    onCompleted: (data) => {
      if (data.project) {
        dispatch(projectSet(data.project));
      }

      if (data.user) {
        dispatch(userSet(data.user));
      }
    },
  });

  if (!data || !project?.id || !user) return null;

  const { id, yDocUpdates } = project;

  return (
    <YObjectsProvider project={{ id, updates: yDocUpdates }}>
      <EditorView projectId={project.id} />
    </YObjectsProvider>
  );
}
