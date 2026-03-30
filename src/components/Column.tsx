import { useState } from "react";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { Task } from "../types";
import { Mode, Status } from "../types";
import TaskCard from "./TaskCard";
import TaskFormModal from "./TaskFormModal";
import { useCreateTask } from "../services/tasks/hooks/useCreateTask";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
}

const COLUMN_STYLES: Record<string, string> = {
  [Status.BACKLOG]: "border-t-gray-400",
  [Status.IN_PROGRESS]: "border-t-blue-400",
  [Status.REVIEW]: "border-t-yellow-400",
  [Status.DONE]: "border-t-green-400",
};

export default function Column({ id, title, tasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createTask } = useCreateTask();

  return (
    <>
      <div
        className={`flex flex-col gap-3 bg-gray-100 rounded-xl p-4 min-h-96 border-t-4 transition-colors
          ${COLUMN_STYLES[id]}
          ${isOver ? "bg-blue-50" : ""}
        `}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
        </div>

        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className="flex flex-col gap-2 flex-1">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {tasks.length === 0 && (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                <p className="text-gray-400 text-xs">No tasks</p>
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-2 py-2 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:text-blue-500 text-gray-400 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              title="Add task with details"
            >
              + Add task
            </button>
          </div>
        </SortableContext>
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={Mode.CREATE}
        defaultStatus={id as Status}
        onSubmit={(data) => createTask(data)}
      />
    </>
  );
}
