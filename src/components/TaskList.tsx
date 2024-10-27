import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Task } from "../types"; // Import Task from types

import { deleteTask, setTaskStatus } from "../features/tasks/tasksSlice";

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const groupedTasks = useMemo(() => {
    const groups: Record<Task["state"], Task[]> = {
      todo: [],
      doing: [],
      done: [],
    };

    tasks.forEach((task) => {
      groups[task.state].push(task);
    });

    return groups;
  }, [tasks]);

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleStateChange = (taskId: string, newState: Task["state"]) => {
    dispatch(setTaskStatus({ id: taskId, state: newState }));
  };

  const renderTaskCard = (task: Task) => (
    <div key={task.id} className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="relative">
        {task.image ? (
          <img
            src={task.image}
            alt={task.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <span
          className={`absolute top-2 right-2 px-2 py-1 rounded text-sm ${
            task.priority === "High"
              ? "bg-red-100 text-red-800"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {task.priority}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="flex items-center justify-between">
        <select
          value={task.state}
          onChange={(e) =>
            handleStateChange(task.id, e.target.value as Task["state"])
          }
          className="rounded border-gray-300 text-sm"
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => onEditTask(task)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(["todo", "doing", "done"] as const).map((state) => (
        <div key={state} className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 capitalize">
            {state === "todo"
              ? "To Do"
              : state === "doing"
              ? "In Progress"
              : "Done"}
            <span className="ml-2 text-sm text-gray-500">
              ({groupedTasks[state].length})
            </span>
          </h2>
          <div className="space-y-4">
            {groupedTasks[state].map(renderTaskCard)}
          </div>
        </div>
      ))}
    </div>
  );
};
