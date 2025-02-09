import { INewCategory, IUpdateCategory } from "@/interface/category.interface";
import {
  createNewCategoryAction,
  deleteCategoryAction,
  getCategoriesForCreatorSettingAction,
  getSingleCategoryForAdminAction,
  updateCategoryAction,
} from "@/server/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCategoriesForCreatorSettingQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesForCreatorSettingAction(),
  });
};

export const useCreateNewCategoryMutation = () => {
  return useMutation({
    mutationFn: (data: INewCategory) => createNewCategoryAction(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.message(result.message);
      } else {
        toast.error(result.error?.message);
      }
    },
  });
};

export const useGetSingleCategoryQuery = ({
  categoryId,
}: {
  categoryId: string;
}) => {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getSingleCategoryForAdminAction({ categoryId }),
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      categoryId,
    }: {
      data: IUpdateCategory;
      categoryId: string;
    }) => updateCategoryAction({ categoryId, data }),
    onSuccess: (result, { categoryId }) => {
      if (result.success) {
        toast.message(result.message);
        queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ categoryId }: { categoryId: string }) =>
      deleteCategoryAction({ categoryId }),
    onSuccess: (result) => {
      if (result.success) {
        toast.message(result.message);
      } else {
        toast.message(result.error?.message);
      }
    },
  });
};
