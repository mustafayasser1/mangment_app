import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Task, User } from "../types";

interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
  onStateChange?: (newState: Task["state"]) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStateChange,
}) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const users = useSelector((state: RootState) => state.users.users);
  const owner = users.find((u: User) => u.id === task.ownerId);
  const assignedUsers = users.filter((u: User) =>
    task.assignedUsers.includes(u.id)
  );
  const isOwner = currentUser?.id === task.ownerId;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {task.image && (
        <img
          src={task.image}
          alt={task.title}
          className="w-full h-32 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium">{task.title}</h3>
          <span
            className={`px-2 py-1 text-xs rounded ${
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

        <p className="text-sm text-gray-600 mb-4">{task.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {assignedUsers.map((user: User) => (
                <div
                  key={user.id}
                  className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs"
                  title={user.name}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    user.name[0].toUpperCase()
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500">Created by {owner?.name}</div>
        </div>

        <div className="flex items-center justify-between">
          {onStateChange && (
            <select
              value={task.state}
              onChange={(e) => onStateChange(e.target.value as Task["state"])}
              className="text-sm rounded border-gray-300"
            >
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          )}

          {isOwner && (
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
