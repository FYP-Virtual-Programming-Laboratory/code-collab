import { getApolloClient } from "@/apollo-client";
import {
  GET_FILE_CONTENT,
  GET_FILE_HISTORY,
  GET_FILE_META,
} from "@/gql/queries";

export class FileManager {
  static async getFileMeta({ fileId }: { fileId: number }) {
    const response = await getApolloClient().query({
      query: GET_FILE_META,
      variables: {
        fileId,
      },
    });

    return response.data.getFile ?? null;
  }

  static async getFileContent({ fileId }: { fileId: number }) {
    const response = await getApolloClient().query({
      query: GET_FILE_CONTENT,
      variables: {
        fileId,
      },
    });

    return response.data.getFile?.content ?? null;
  }

  static async getFileHistory({ fileId }: { fileId: number }) {
    const response = await getApolloClient().query({
      query: GET_FILE_HISTORY,
      variables: {
        fileId,
      },
    });

    return response.data.getFileVersions ?? [];
  }
}
