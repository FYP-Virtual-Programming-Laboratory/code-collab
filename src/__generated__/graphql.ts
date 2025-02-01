/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Change = {
  __typename?: 'Change';
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lineNumber: Scalars['Int']['output'];
  madeBy: User;
  operation: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  versionId: Scalars['Int']['output'];
};

export type ContributionStats = {
  __typename?: 'ContributionStats';
  contributions: Scalars['Int']['output'];
  contributorId: Scalars['Int']['output'];
};

export type File = {
  __typename?: 'File';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lastModified: Scalars['DateTime']['output'];
  path: Scalars['String']['output'];
  /** File size in bytes */
  size?: Maybe<Scalars['Int']['output']>;
  versions: Array<Version>;
};

export type FileMeta = {
  __typename?: 'FileMeta';
  content: Scalars['String']['output'];
  contributionStats: Array<ContributionStats>;
  contributorIds: Array<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lastModified: Scalars['DateTime']['output'];
  path: Scalars['String']['output'];
  /** File size in bytes */
  size?: Maybe<Scalars['Int']['output']>;
  versions: Array<Version>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProjectMember: Scalars['Boolean']['output'];
  /** Create a new project. */
  createProject: Project;
  removeProjectMember: Scalars['Boolean']['output'];
  updateProject: Scalars['Boolean']['output'];
};


export type MutationAddProjectMemberArgs = {
  projectId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateProjectArgs = {
  creatorId: Scalars['Int']['input'];
  memberIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  name: Scalars['String']['input'];
  sessionId: Scalars['String']['input'];
};


export type MutationRemoveProjectMemberArgs = {
  projectId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationUpdateProjectArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  sessionId?: InputMaybe<Scalars['String']['input']>;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  id: Scalars['Int']['output'];
  members: Array<User>;
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Get file content by file `id`. Returns `null` if file with the id does not exist. */
  getFileContent?: Maybe<Scalars['String']['output']>;
  /** Get file metadata by file `id`. Returns `null` if file with the id does not exist. */
  getFileMeta?: Maybe<FileMeta>;
  /** Get all versions of a file by file `id`. Returns an empty array if file with the id does not exist. */
  getFileVersions: Array<Version>;
  /** Find a project by its `id`. If `null` is returned, then the project could not be found. */
  getProject?: Maybe<Project>;
  /** Find a project by its `sessionId`. If `null` is returned, then the project could not be found. */
  getProjectBySessionId?: Maybe<Project>;
  /** Find a user by `id`. Returns null if user with specified `id` cannot be found. */
  getUser?: Maybe<User>;
  /** Find multiple users by their `id`s. Returns only the users it finds. */
  getUsers: Array<User>;
  /** List all files in a project. Returns an empty array if no files are found or if project does not exist. */
  listFiles: Array<File>;
};


export type QueryGetFileContentArgs = {
  fileId: Scalars['Int']['input'];
};


export type QueryGetFileMetaArgs = {
  fileId: Scalars['Int']['input'];
};


export type QueryGetFileVersionsArgs = {
  fileId: Scalars['Int']['input'];
};


export type QueryGetProjectArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetProjectBySessionIdArgs = {
  sessionId: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUsersArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type QueryListFilesArgs = {
  projectId: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Version = {
  __typename?: 'Version';
  changes: Array<Change>;
  committedBy: User;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
};

export type ListFilesQueryVariables = Exact<{
  projectId: Scalars['Int']['input'];
}>;


export type ListFilesQuery = { __typename?: 'Query', listFiles: Array<{ __typename?: 'File', id: number, path: string, content: string }> };


export const ListFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<ListFilesQuery, ListFilesQueryVariables>;