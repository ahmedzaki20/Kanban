import { create } from "zustand";
import { Status, Priority } from "../types";
import type { Task } from "../types";

interface TodoStore {
  tasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredTasks: () => Task[];
  addTask: (title: string, description: string, priority: Priority) => void;
  updateTaskStatus: (id: string, status: Status) => void;
  reorderTasks: (tasks: Task[]) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  searchQuery: "",

  tasks: [],

  setSearchQuery: (query) => set({ searchQuery: query }),

  filteredTasks: () => {
    const { tasks, searchQuery } = get();
    if (!searchQuery.trim()) return tasks;
    const lower = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lower) ||
        task.description.toLowerCase().includes(lower),
    );
  },

  addTask: (title, description, priority) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          description,
          status: Status.BACKLOG,
          priority,
        },
      ],
    })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task,
      ),
    })),

  reorderTasks: (tasks) => set({ tasks }),
}));
