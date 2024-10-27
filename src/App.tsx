import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task, RootState } from "./types";
import { TaskForm } from "./components/TaskForm";
import { Board } from "./components/Board";
import { Sidebar } from "./components/Sidebar";
import { Login } from "./components/auth/Login";
import { setTaskStatus, deleteTask } from "./features/tasks/tasksSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  if (!isAuthenticated || !user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="pl-64">
        <div className="p-8">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentBoard?.title || "Task Management"}
              </h1>
              <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isFormVisible ? "Close Form" : "Add New Task"}
              </button>
            </div>
          </header>

          {(isFormVisible || editingTask) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {editingTask ? "Edit Task" : "Create New Task"}
              </h2>
              <TaskForm
                task={editingTask}
                onSubmit={() => {
                  setEditingTask(null);
                  setIsFormVisible(false);
                }}
                currentUserId={user.id}
              />
            </div>
          )}

          <Board
            tasks={tasks}
            onTaskMove={(taskId, newState) => {
              dispatch(setTaskStatus({ id: taskId, state: newState }));
            }}
            onEditTask={(task) => {
              setEditingTask(task);
              setIsFormVisible(true);
            }}
            onDeleteTask={(taskId) => {
              if (
                window.confirm("Are you sure you want to delete this task?")
              ) {
                dispatch(deleteTask(taskId));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
