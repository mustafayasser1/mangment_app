export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Board {
  id: string;
  title: string;
  background: string;
  ownerId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  state: "todo" | "doing" | "done";
  createdAt: string;
  ownerId: string;
  image?: string;
  assignedUsers: string[]; // Array of user IDs
}
