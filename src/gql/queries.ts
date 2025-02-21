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

export const GET_FILE_CONTENT = gql(`
query GetFileContent($fileId: Int!) {
  getFile(fileId: $fileId) {
    content
  }
}`);

export const GET_FILE_META = gql(`
query GetFileMeta($fileId: Int!) {
  getFile(fileId: $fileId) {
    contributions {
      contributionStats {
        contributorId
        contributions
      }
    }
    createdAt
    id
    lastModified
    path
    size
  }
}`);

export const GET_FILE_HISTORY = gql(`
query GetFileHistory($fileId: Int!) {
  getFileVersions(fileId: $fileId) {
    id
    createdAt
    committedBy {
      id
      username
    }
  }
}`);
