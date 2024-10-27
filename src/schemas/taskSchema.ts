// schemas/taskSchema.ts
import * as yup from "yup";
import type { TaskFormData } from "../types";

export const taskSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must not exceed 50 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  image: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .url("Must be a valid URL when provided"),

  priority: yup
    .mixed<TaskFormData["priority"]>()
    .oneOf(["Low", "Medium", "High"] as const, "Invalid priority")
    .required("Priority is required"),

  state: yup
    .mixed<TaskFormData["state"]>()
    .oneOf(["todo", "doing", "done"] as const, "Invalid state")
    .required("State is required"),
}) as yup.ObjectSchema<TaskFormData>;

export type { TaskFormData };
