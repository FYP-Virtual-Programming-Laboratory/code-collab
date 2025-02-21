import { gql } from "@/__generated__";

export const GET_PROJECT_AND_USER = gql(`
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

export const GET_PROJECT_QUERY = gql(`
query GetProjectBySessionId($sessionId: String!) {
  getProjectBySessionId(sessionId: $sessionId) {
    id
    sessionId
    name
    members {
      id
    }
    createdAt
  }
}`);

export const LIST_PROJECT_FILES_QUERY = gql(`
query ListProjectFiles($projectId: Int!) {
  listFiles(projectId: $projectId) {
    id
    path
    size
    createdAt
    lastModified
  }
}`);

export const LIST_FILES = gql(`
  query ListFiles($projectId: Int!) {
    listFiles(projectId: $projectId) {
      id
      path
      content
    }
  }
`);
