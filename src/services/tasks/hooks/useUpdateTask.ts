import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../../../types";
import { TASKS_KEY, taskService } from "..";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...task }: Partial<Task> & { id: string }) =>
      taskService.update(id, task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
    onError: (err) => {
      console.log(err);
    },
  });
}
