import { getApolloClient } from "@/apollo-client";
import {
  ADD_PROJECT_MEMBER_MUTATION,
  CREATE_PROJECT_MUTATION,
  REMOVE_PROJECT_MEMBER_MUTATION,
  UPDATE_PROJECT_MUTATION,
} from "@/gql/mutations";
import { GET_PROJECT_QUERY, LIST_PROJECT_FILES_QUERY } from "@/gql/queries";

export class ProjectManager {
  private static apolloClient = getApolloClient();

  static async createProject({
    sessionId,
    createdBy,
    projectName,
    participantIds,
  }: {
    sessionId: string;
    createdBy: number;
    projectName: string;
    participantIds: number[];
  }) {
    const res = await this.apolloClient.mutate({
      mutation: CREATE_PROJECT_MUTATION,
      variables: {
        sessionId,
        creatorId: createdBy,
        name: projectName,
        memberIds: participantIds,
      },
    });

    return res.data?.createProject ?? null;
  }

  static async updateProject({
    sessionId,
    projectName,
  }: {
    sessionId: string;
    projectName: string;
  }) {
    const res = await this.apolloClient.mutate({
      mutation: UPDATE_PROJECT_MUTATION,
      variables: {
        sessionId,
        name: projectName,
      },
    });

    return res.data?.updateProject ?? false;
  }

  static async addUserToProject({
    projectId,
    userId,
  }: {
    projectId: number;
    userId: number;
  }) {
    const res = await this.apolloClient.mutate({
      mutation: ADD_PROJECT_MEMBER_MUTATION,
      variables: {
        projectId,
        userId,
      },
    });

    return res.data?.addProjectMember ?? false;
  }

  static async removeUserFromProject({
    projectId,
    userId,
  }: {
    projectId: number;
    userId: number;
  }) {
    const res = await this.apolloClient.mutate({
      mutation: REMOVE_PROJECT_MEMBER_MUTATION,
      variables: {
        projectId,
        userId,
      },
    });

    return res.data?.removeProjectMember ?? false;
  }

  static async getProjectInfo({ sessionId }: { sessionId: string }) {
    const res = await this.apolloClient.query({
      query: GET_PROJECT_QUERY,
      variables: {
        sessionId,
      },
    });

    if (res.errors) {
      throw new Error("Failed to fetch project info");
    }

    return res.data?.getProjectBySessionId ?? null;
  }

  static async listFiles({ projectId }: { projectId: number }) {
    const res = await this.apolloClient.query({
      query: LIST_PROJECT_FILES_QUERY,
      variables: {
        projectId,
      },
    });

    if (res.errors) {
      throw new Error("Failed to fetch project files");
    }

    return res.data?.listFiles ?? [];
  }
}
