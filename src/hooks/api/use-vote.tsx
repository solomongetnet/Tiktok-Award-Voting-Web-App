import { submitVoteAction } from "@/server/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ISubmitVote {
  creatorId: string;
  categoryId: string;
}

export const useSubmitVoteMutation = () => {
  return useMutation({
    mutationFn: ({ categoryId, creatorId }: ISubmitVote) =>
      submitVoteAction({ categoryId, creatorId }),
    onSuccess: (result) => {
      if (result.success) {
        toast.message(result.message);
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};
