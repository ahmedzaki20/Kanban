import { axiosInstance } from "../../lib/axios";
import type { Task } from "../../types";

export const TASKS_KEY = ["tasks"];

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const { data } = await axiosInstance.get("/tasks");
    return data;
  },

  create: async (task: Omit<Task, "id">): Promise<Task> => {
    const { data } = await axiosInstance.post("/tasks", task);
    return data;
  },

  update: async (id: string, task: Partial<Task>): Promise<Task> => {
    const { data } = await axiosInstance.patch(`/tasks/${id}`, task);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/tasks/${id}`);
  },
};
