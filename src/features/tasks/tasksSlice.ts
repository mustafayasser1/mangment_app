import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types";

interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setTaskStatus: (
      state,
      action: PayloadAction<{ id: string; state: Task["state"] }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.state = action.payload.state;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, setTaskStatus } =
  tasksSlice.actions;
export default tasksSlice.reducer;
