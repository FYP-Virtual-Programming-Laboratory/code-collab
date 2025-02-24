# CRDT Editor

## Overview

This project provides a collaborative real-time editor using CRDTs (Conflict-free Replicated Data Types). It includes functionalities for managing projects and files, and integrates with Apollo Client for GraphQL operations.

## Installation

To install the dependencies, run:

```bash
pnpm install
```

To install the library, run:

```bash
pnpm add code-collab
```

## Usage

### Configuration

You can configure the URLs for GraphQL, WebSocket, and signaling server using the `configure` function.

```typescript
import { configure } from "code-collab";

configure({
  gqlUrl: "http://your-graphql-url",
  wsUrl: "ws://your-websocket-url",
  signalUrl: "ws://your-signal-url",
});
```

### FileManager

The `FileManager` class provides methods to interact with files.

#### Get File Metadata

```typescript
import { FileManager } from "code-collab";

const fileMeta = await FileManager.getFileMeta({ fileId: 1 });
```

#### Get File Content

```typescript
const fileContent = await FileManager.getFileContent({ fileId: 1 });
```

#### Get File History

```typescript
const fileHistory = await FileManager.getFileHistory({ fileId: 1 });
```

### ProjectManager

The `ProjectManager` class provides methods to manage projects.

#### Create Project

```typescript
import { ProjectManager } from "code-collab";

const project = await ProjectManager.createProject({
  sessionId: "session-id",
  createdBy: 1,
  projectName: "New Project",
  participantIds: [1, 2, 3],
});
```

#### Update Project

```typescript
const updated = await ProjectManager.updateProject({
  sessionId: "session-id",
  projectName: "Updated Project Name",
});
```

#### Add User to Project

```typescript
const added = await ProjectManager.addUserToProject({
  projectId: 1,
  userId: 2,
});
```

#### Remove User from Project

```typescript
const removed = await ProjectManager.removeUserFromProject({
  projectId: 1,
  userId: 2,
});
```

#### Get Project Info

```typescript
const projectInfo = await ProjectManager.getProjectInfo({
  sessionId: "session-id",
});
```

#### List Project Files

```typescript
const files = await ProjectManager.listFiles({ projectId: 1 });
```

### CodeCollab Component

The `CodeCollab` component sets up the collaborative editor.

#### Props

- `sessionId` (string): The session ID for the project.
- `userId` (number): The user ID of the current user.
- `serverUrl` (string, optional): The URL of the GraphQL server. Default is `"http://localhost:3000/graphql"`.

#### Example

```tsx
import CodeCollab from "code-collab";

function App() {
  return <CodeCollab sessionId="session-id" userId={1} />;
}
```

## License

This project is licensed under the MIT License.

```

```
