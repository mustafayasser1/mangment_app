import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../features/tasks/tasksSlice";
import type { Task } from "../types";
import { taskSchema, type TaskFormData } from "../schemas/taskSchema";

interface TaskFormProps {
  task?: Task;
  onSubmit?: () => void;
  currentUserId: string; // Add this prop to get the current user's ID
}

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSubmit,
  currentUserId,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: task || {
      title: "",
      description: "",
      priority: "Medium",
      state: "todo",
      image: "",
    },
  });

  const onSubmitForm = (data: TaskFormData) => {
    if (task) {
      dispatch(
        updateTask({
          ...data,
          id: task.id,
          createdAt: task.createdAt,
          ownerId: task.ownerId,
          assignedUsers: task.assignedUsers,
        })
      );
    } else {
      dispatch(
        addTask({
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          ownerId: currentUserId,
          assignedUsers: [currentUserId], // Initially assign to creator
        })
      );
      reset();
    }
    onSubmit?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-4 max-w-2xl mx-auto"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          {...register("image")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.image && (
          <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register("title")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          {...register("priority")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && (
          <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">State</label>
        <select
          {...register("state")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        {errors.state && (
          <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};
