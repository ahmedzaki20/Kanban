import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../../../types";
import { TASKS_KEY, taskService } from "..";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Omit<Task, "id">) => taskService.create(task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
    onError: (err) => {
      console.log(err);
    },
  });
}
