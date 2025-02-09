import { upsertAwardEventAction, getAwardEventAction } from "@/server/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpsertAwardEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertAwardEventAction,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["awardEvent"] });

      if (result.success) {
        toast.message(result.message);
      } else {
        // @ts-ignore
        toast.error(result.error?.message);
      }
    },
  });
};

export const useGetAwardEventQuery = () => {
  return useQuery({
    queryKey: ["awardEvent"],
    queryFn: getAwardEventAction,
  });
};
