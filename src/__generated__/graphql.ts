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

export type Contributions = {
  __typename?: 'Contributions';
  contributionStats: Array<ContributionStats>;
  contributorIds: Array<Scalars['Int']['output']>;
};

export type File = {
  __typename?: 'File';
  content: Scalars['String']['output'];
  contributions: Contributions;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lastModified: Scalars['DateTime']['output'];
  path: Scalars['String']['output'];
  /** File size in bytes */
  size?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProjectMember: Scalars['Boolean']['output'];
  /** Create a new project. */
  createProject: Project;
  /** Create a new file. Returns the new file */
  newFile: File;
  removeProjectMember: Scalars['Boolean']['output'];
  /** Update a file's content. Returns the file. */
  updateFile: File;
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


export type MutationNewFileArgs = {
  filePath: Scalars['String']['input'];
  initialContent?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['Int']['input'];
};


export type MutationRemoveProjectMemberArgs = {
  projectId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationUpdateFileArgs = {
  fileId: Scalars['Int']['input'];
  newContent: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
  yDocUpdates: Scalars['String']['input'];
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
  sessionId: Scalars['String']['output'];
  yDocUpdates: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
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

export type UpdateFileMutationVariables = Exact<{
  fileId: Scalars['Int']['input'];
  newContent: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
  yDocUpdates: Scalars['String']['input'];
}>;


export type UpdateFileMutation = { __typename?: 'Mutation', updateFile: { __typename?: 'File', id: number, size?: number | null, content: string, lastModified: any } };

export type CreateProjectMutationVariables = Exact<{
  sessionId: Scalars['String']['input'];
  creatorId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  memberIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: number, name: string, sessionId: string, createdAt: any } };

export type UpdateProjectMutationVariables = Exact<{
  name: Scalars['String']['input'];
  updateProjectId?: InputMaybe<Scalars['Int']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: boolean };

export type AddProjectMemberMutationVariables = Exact<{
  projectId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type AddProjectMemberMutation = { __typename?: 'Mutation', addProjectMember: boolean };

export type RemoveProjectMemberMutationVariables = Exact<{
  projectId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type RemoveProjectMemberMutation = { __typename?: 'Mutation', removeProjectMember: boolean };

export type GetProjectAndUserQueryVariables = Exact<{
  sessionId: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
}>;


export type GetProjectAndUserQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: number, sessionId: string, name: string, createdAt: any, yDocUpdates: string } | null, user?: { __typename?: 'User', id: number, email: string, username: string, firstName: string, lastName: string } | null };

export type GetProjectBySessionIdQueryVariables = Exact<{
  sessionId: Scalars['String']['input'];
}>;


export type GetProjectBySessionIdQuery = { __typename?: 'Query', getProjectBySessionId?: { __typename?: 'Project', id: number, sessionId: string, name: string, createdAt: any, members: Array<{ __typename?: 'User', id: number }> } | null };

export type ListProjectFilesQueryVariables = Exact<{
  projectId: Scalars['Int']['input'];
}>;


export type ListProjectFilesQuery = { __typename?: 'Query', listFiles: Array<{ __typename?: 'File', id: number, path: string, size?: number | null, createdAt: any, lastModified: any }> };

export type ListFilesQueryVariables = Exact<{
  projectId: Scalars['Int']['input'];
}>;


export type ListFilesQuery = { __typename?: 'Query', listFiles: Array<{ __typename?: 'File', id: number, path: string, content: string }> };


export const UpdateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newContent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yDocUpdates"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newContent"}}},{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"yDocUpdates"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yDocUpdates"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"lastModified"}}]}}]}}]} as unknown as DocumentNode<UpdateFileMutation, UpdateFileMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"creatorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"creatorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"creatorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"memberIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProjectId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProjectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}]}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const AddProjectMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProjectMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProjectMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<AddProjectMemberMutation, AddProjectMemberMutationVariables>;
export const RemoveProjectMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProjectMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProjectMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<RemoveProjectMemberMutation, RemoveProjectMemberMutationVariables>;
export const GetProjectAndUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectAndUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"project"},"name":{"kind":"Name","value":"getProjectBySessionId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"yDocUpdates"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<GetProjectAndUserQuery, GetProjectAndUserQueryVariables>;
export const GetProjectBySessionIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectBySessionId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjectBySessionId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetProjectBySessionIdQuery, GetProjectBySessionIdQueryVariables>;
export const ListProjectFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListProjectFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastModified"}}]}}]}}]} as unknown as DocumentNode<ListProjectFilesQuery, ListProjectFilesQueryVariables>;
export const ListFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<ListFilesQuery, ListFilesQueryVariables>;