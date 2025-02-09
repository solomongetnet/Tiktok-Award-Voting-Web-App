import {
  getCategoriesForCreatorSettingAction,
  getCreatorCategorySubmissionsForAdminAction,
  getSingleCreatorForAdminAction,
} from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

const fetchCreatorForAdminPageData = async ({
  creatorId,
}: {
  creatorId: string;
}) => {
  const [allCategories, creatorData, creatorSubmissions] = await Promise.all([
    await getCategoriesForCreatorSettingAction(),
    await getSingleCreatorForAdminAction({ creatorId }),
    await getCreatorCategorySubmissionsForAdminAction({ creatorId }),
  ]);
  return { allCategories, creatorData,creatorSubmissions };
};

export const useGetCreatorPageDataQuery = ({
  creatorId,
}: {
  creatorId: string;
}) => {
  return useQuery({
    queryFn: () => fetchCreatorForAdminPageData({ creatorId }),
    queryKey: ["creator", creatorId],
  });
};
