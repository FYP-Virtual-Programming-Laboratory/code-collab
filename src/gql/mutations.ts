import { gql } from "@/__generated__";

export const UPDATE_FILE = gql(`
  mutation UpdateFile($fileId: Int!, $newContent: String!, $projectId: Int!, $yDocUpdates: String!) {
    updateFile(fileId: $fileId, newContent: $newContent, projectId: $projectId, yDocUpdates: $yDocUpdates) {
      id
      size
      content
      lastModified
    }
  }
`);

export const CREATE_PROJECT_MUTATION = gql(`
mutation CreateProject($sessionId: String!, $creatorId: Int!, $name: String!, $memberIds: [Int!]) {
  createProject(sessionId: $sessionId, creatorId: $creatorId, name: $name, memberIds: $memberIds) {
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
mutation AddProjectMember($projectId: Int!, $userId: Int!) {
  addProjectMember(projectId: $projectId, userId: $userId)
}`);

export const REMOVE_PROJECT_MEMBER_MUTATION = gql(`
mutation RemoveProjectMember($projectId: Int!, $userId: Int!) {
  removeProjectMember(projectId: $projectId, userId: $userId)
}`);
