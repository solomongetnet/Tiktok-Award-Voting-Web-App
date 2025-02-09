import { INewCreator, IUpdateCreator } from "@/interface/creator.interface";
import {
  assignCreatorToCategoryAction,
  createNewCreatorAction,
  deleteCreatorAction,
  getSingleCreatorForAdminAction,
  removeCreatorFromCategoryAction,
  updateCreatorInformationAction,
} from "@/server/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateNewCreatorMutation = () => {
  return useMutation({
    mutationFn: ({
      data,
      formData,
    }: {
      data: INewCreator;
      formData: FormData;
    }) => createNewCreatorAction(data, formData),
    onSuccess: (result) => {
      if (result.success) {
        toast.message(result.message);
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};

export const useDeleteCreatorMutation = () => {
  return useMutation({
    mutationFn: ({ creatorId }: { creatorId: string }) =>
      deleteCreatorAction({creatorId}),
    onSuccess: (result) => {
      if (result.success) {
        toast.message(result.message);
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};

export const useGetSingleCreatorForAdminQuery = ({
  creatorId,
}: {
  creatorId: string;
}) => {
  return useQuery({
    queryFn: () => getSingleCreatorForAdminAction({ creatorId }),
    queryKey: ["getSingleCreatorForAdmin", creatorId],
  });
};

export const useUpdateCreatorInfromationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      creatorId,
    }: {
      data: IUpdateCreator;
      creatorId: string;
    }) => updateCreatorInformationAction({ creatorId, data }),
    onSuccess: (result, { creatorId }) => {
      if (result.success) {
        toast.message(result.message);
        queryClient.invalidateQueries({
          queryKey: ["getSingleCreatorForAdmin", creatorId],
        });
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};

export const useAssignCreatorToCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      creatorId,
      categoryId,
    }: {
      creatorId: string;
      categoryId: string;
    }) => assignCreatorToCategoryAction({ creatorId, categoryId }),
    onSuccess: (result, { creatorId }) => {
      if (result.success) {
        toast.message(result.message);
        queryClient.invalidateQueries({
          queryKey: ["creator", creatorId],
        });
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};

export const useRemoveCreatorFromCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      creatorId,
      categoryId,
    }: {
      creatorId: string;
      categoryId: string;
    }) => removeCreatorFromCategoryAction({ creatorId, categoryId }),
    onSuccess: (result, { creatorId }) => {
      if (result.success) {
        toast.message(result.message);
        queryClient.invalidateQueries({
          queryKey: ["creator", creatorId],
        });
        queryClient.invalidateQueries({
          queryKey: ["creatorSubmissions"],
        });
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};
