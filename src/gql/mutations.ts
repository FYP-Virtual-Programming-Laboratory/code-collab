import { gql } from "@/__generated__";

export const UPDATE_FILE = gql(`
  mutation UpdateFile($fileId: Int!, $newContent: String!, $projectId: Int!, $yDocUpdates: String!, $snapshot: String!) {
    updateFile(fileId: $fileId, newContent: $newContent, projectId: $projectId, yDocUpdates: $yDocUpdates, snapshot: $snapshot) {
      id
      size
      content
      lastModified
    }
  }
`);

export const CREATE_PROJECT_MUTATION = gql(`
mutation CreateProject($sessionId: String!, $name: String!, $members: [String!]) {
  createProject(sessionId: $sessionId, name: $name, members: $members) {
    id
    name
    sessionId
    createdAt
  }
}`);

export const UPDATE_PROJECT_MUTATION = gql(`
mutation UpdateProject($name: String!, $updateProjectId: Int, $sessionId: String) {
  updateProject(name: $name, id: $updateProjectId, sessionId: $sessionId)
}`);

export const ADD_PROJECT_MEMBER_MUTATION = gql(`
mutation AddProjectMember($projectId: Int!, $user: String!) {
  addProjectMember(projectId: $projectId, user: $user)
}`);

export const REMOVE_PROJECT_MEMBER_MUTATION = gql(`
mutation RemoveProjectMember($projectId: Int!, $user: String!) {
  removeProjectMember(projectId: $projectId, user: $user)
}`);
