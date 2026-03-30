import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASKS_KEY, taskService } from "..";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
    onError: (err) => {
      console.log(err);
    },
  });
}
