import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TaskCard } from "./TaskCard";
import { Task } from "../types";

export const Board: React.FC<{
  tasks: Task[];
  onTaskMove: (taskId: string, newState: Task["state"]) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}> = ({ tasks, onTaskMove, onEditTask, onDeleteTask }) => {
  const columns = {
    todo: tasks.filter((t) => t.state === "todo"),
    doing: tasks.filter((t) => t.state === "doing"),
    done: tasks.filter((t) => t.state === "done"),
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newState = result.destination.droppableId as Task["state"];
    onTaskMove(taskId, newState);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["todo", "doing", "done"] as const).map((state) => (
          <Droppable key={state} droppableId={state}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <h2 className="text-xl font-semibold mb-4 capitalize">
                  {state === "todo"
                    ? "To Do"
                    : state === "doing"
                    ? "In Progress"
                    : "Done"}
                  <span className="ml-2 text-sm text-gray-500">
                    ({columns[state].length})
                  </span>
                </h2>
                <div className="space-y-4">
                  {columns[state].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={() => onEditTask(task)}
                            onDelete={() => onDeleteTask(task.id)}
                            onStateChange={(newState) =>
                              onTaskMove(task.id, newState)
                            }
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
