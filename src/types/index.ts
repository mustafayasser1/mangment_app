// Base interfaces for entities
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
  image: string | null;
  assignedUsers: string[];
}

// Form Data interface
export interface TaskFormData {
  title: string;
  description: string;
  image: string | null;
  priority: "Low" | "Medium" | "High";
  state: "todo" | "doing" | "done";
}

// State interfaces for Redux slices
export interface BoardsState {
  boards: Board[];
  currentBoard: Board | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

export interface AuthState {
  isAuthenticated: boolean; // Added back
  user: User | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

export interface UsersState {
  users: User[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Root state type
export interface RootState {
  auth: AuthState;
  boards: BoardsState;
  tasks: TasksState;
  users: UsersState;
}
