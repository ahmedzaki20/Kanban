import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Mode, type Task } from "../types";
import PriorityBadge from "./PriorityBadge";
import TaskFormModal from "./TaskFormModal";
import { useDeleteTask } from "../services/tasks/hooks/useDeleteTask";
import { useUpdateTask } from "../services/tasks/hooks/useUpdateTask";
import { useTodoStore } from "../store/useTodoStore";

interface Props {
  task: Task;
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function TaskCard({ task }: Props) {
  const { searchQuery } = useTodoStore();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 select-none flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400 text-lg"
          >
            ⠿
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-gray-300 hover:text-blue-400 transition-colors text-xs cursor-pointer"
            >
              ✎
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-300 hover:text-red-400 transition-colors text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Title */}
        <p className="text-sm text-gray-800 font-medium">
          {highlight(task.title, searchQuery)}
        </p>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-gray-500">
            {highlight(task.description, searchQuery)}
          </p>
        )}

        {/* Priority badge — bottom left */}
        <div className="flex items-center mt-auto pt-1">
          <PriorityBadge priority={task.priority} />
        </div>
      </div>

      {/* Edit Modal */}
      <TaskFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        mode={Mode.EDIT}
        initialData={task}
        onSubmit={(data) => updateTask({ id: task.id, ...data })}
      />
    </>
  );
}
