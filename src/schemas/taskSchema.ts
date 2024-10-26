import * as yup from "yup";
import type { Task } from "../types";

const taskSchema = yup.object().shape({
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
    .nullable() // Make it optional
    .transform((value) => (value === "" ? null : value)) // Transform empty string to null
    .url("Must be a valid URL when provided"), // Only validate URL if value exists

  priority: yup
    .string()
    .oneOf(["Low", "Medium", "High"], "Invalid priority")
    .required("Priority is required"),

  state: yup
    .string()
    .oneOf(["todo", "doing", "done"], "Invalid state")
    .required("State is required"),
});

// Form data type that matches the schema
interface TaskFormData {
  title: string;
  description: string;
  image: string | null; // Match the schema's nullable type
  priority: "Low" | "Medium" | "High";
  state: "todo" | "doing" | "done";
}

export { taskSchema };
export type { TaskFormData };
