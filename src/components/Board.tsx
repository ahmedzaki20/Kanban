import { useState } from "react";

import {
  DndContext,
  closestCorners,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { Status } from "../types";
import type { Task } from "../types";
import Column from "./Column";
import TaskCard from "./TaskCard";
import { useTodoStore } from "../store/useTodoStore";
import { useGetTasks } from "../services/tasks/hooks/useGetTasks";
import { useUpdateTask } from "../services/tasks/hooks/useUpdateTask";

const COLUMNS = [
  { id: Status.BACKLOG, title: "Backlog" },
  { id: Status.IN_PROGRESS, title: "In Progress" },
  { id: Status.REVIEW, title: "Review" },
  { id: Status.DONE, title: "Done" },
];

export default function Board() {
  const { tasks, filteredTasks, updateTaskStatus, reorderTasks } =
    useTodoStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { isLoading } = useGetTasks();
  const { mutate: updateTask } = useUpdateTask();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const isOverColumn = COLUMNS.some((col) => col.id === over.id);

    if (isOverColumn) {
      if (activeTask.status !== over.id) {
        updateTaskStatus(active.id as string, over.id as Status);
      }
      return;
    }

    const overTask = tasks.find((t) => t.id === over.id);
    if (!overTask) return;

    const activeIndex = tasks.findIndex((t) => t.id === active.id);
    const overIndex = tasks.findIndex((t) => t.id === over.id);

    if (activeTask.status === overTask.status) {
      reorderTasks(arrayMove(tasks, activeIndex, overIndex));
    } else {
      const updatedTasks = tasks.map((t) =>
        t.id === active.id ? { ...t, status: overTask.status } : t,
      );
      reorderTasks(arrayMove(updatedTasks, activeIndex, overIndex));
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const task = tasks.find((t) => t.id === active.id);
    if (!task) return;

    const isOverColumn = COLUMNS.some((col) => col.id === over.id);
    const newStatus = isOverColumn ? (over.id as Status) : task.status;

    updateTask({ id: task.id, status: newStatus });
  }

  const visibleTasks = filteredTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Loading tasks...</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={visibleTasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-2 scale-105 opacity-95 shadow-xl">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
