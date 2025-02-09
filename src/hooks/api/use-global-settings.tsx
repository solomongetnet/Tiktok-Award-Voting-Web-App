import {
  getVotingEndDateSettingAction,
  updateVotingEndDateSettingAction,
  removeVotingEndDateSettingAction,
} from "@/server/actions/global-settings.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const updateVotingEndDateSettingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ votingEndDate }: { votingEndDate: Date }) =>
      updateVotingEndDateSettingAction({ votingEndDate }),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["votingEndDate"] });
        toast.message(result.message);
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};

export const useRemoveVotingEndDateSettingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeVotingEndDateSettingAction(),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["votingEndDate"] });
        toast.message(result.message);
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};

export const useGetCurrentVotingEndDateQuery = () => {
  return useQuery({
    queryKey: ["votingEndDate"],
    queryFn: getVotingEndDateSettingAction,
  });
};
