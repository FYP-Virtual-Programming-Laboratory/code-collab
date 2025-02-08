/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation UpdateFile($fileId: Int!, $newContent: String!, $projectId: Int!, $yDocUpdates: String!) {\n    updateFile(fileId: $fileId, newContent: $newContent, projectId: $projectId, yDocUpdates: $yDocUpdates) {\n      id\n      size\n      content\n      lastModified\n    }\n  }\n": typeof types.UpdateFileDocument,
    "\n  query GetProjectBySessionId($sessionId: String!) {\n    getProjectBySessionId(sessionId: $sessionId) {\n      id\n      name\n      createdAt\n      yDocUpdates\n    }\n  }\n": typeof types.GetProjectBySessionIdDocument,
    "\n  query ListFiles($projectId: Int!) {\n    listFiles(projectId: $projectId) {\n      id\n      path\n      content\n    }\n  }\n": typeof types.ListFilesDocument,
};
const documents: Documents = {
    "\n  mutation UpdateFile($fileId: Int!, $newContent: String!, $projectId: Int!, $yDocUpdates: String!) {\n    updateFile(fileId: $fileId, newContent: $newContent, projectId: $projectId, yDocUpdates: $yDocUpdates) {\n      id\n      size\n      content\n      lastModified\n    }\n  }\n": types.UpdateFileDocument,
    "\n  query GetProjectBySessionId($sessionId: String!) {\n    getProjectBySessionId(sessionId: $sessionId) {\n      id\n      name\n      createdAt\n      yDocUpdates\n    }\n  }\n": types.GetProjectBySessionIdDocument,
    "\n  query ListFiles($projectId: Int!) {\n    listFiles(projectId: $projectId) {\n      id\n      path\n      content\n    }\n  }\n": types.ListFilesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateFile($fileId: Int!, $newContent: String!, $projectId: Int!, $yDocUpdates: String!) {\n    updateFile(fileId: $fileId, newContent: $newContent, projectId: $projectId, yDocUpdates: $yDocUpdates) {\n      id\n      size\n      content\n      lastModified\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFile($fileId: Int!, $newContent: String!, $projectId: Int!, $yDocUpdates: String!) {\n    updateFile(fileId: $fileId, newContent: $newContent, projectId: $projectId, yDocUpdates: $yDocUpdates) {\n      id\n      size\n      content\n      lastModified\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProjectBySessionId($sessionId: String!) {\n    getProjectBySessionId(sessionId: $sessionId) {\n      id\n      name\n      createdAt\n      yDocUpdates\n    }\n  }\n"): (typeof documents)["\n  query GetProjectBySessionId($sessionId: String!) {\n    getProjectBySessionId(sessionId: $sessionId) {\n      id\n      name\n      createdAt\n      yDocUpdates\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListFiles($projectId: Int!) {\n    listFiles(projectId: $projectId) {\n      id\n      path\n      content\n    }\n  }\n"): (typeof documents)["\n  query ListFiles($projectId: Int!) {\n    listFiles(projectId: $projectId) {\n      id\n      path\n      content\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;