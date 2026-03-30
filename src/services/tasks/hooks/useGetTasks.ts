import { useQuery } from "@tanstack/react-query";
import { useTodoStore } from "../../../store/useTodoStore";
import { TASKS_KEY, taskService } from "..";

export function useGetTasks() {
  const reorderTasks = useTodoStore((s) => s.reorderTasks);

  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: async () => {
      const tasks = await taskService.getAll();
      reorderTasks(tasks);
      return tasks;
    },
  });
}
