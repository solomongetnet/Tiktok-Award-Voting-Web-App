"use client";

import Loader from "@/components/common/loader";
import CreatorInformationFormContainer from "./_creator-information-form-container";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import CreatorCategoriesSettingContainer from "./_creator-categories-container";
import { useGetCreatorPageDataQuery } from "@/hooks/api/use-combined";

export default function UpdateCategoryPage() {
  const params = useParams();
  const creatorId = params.id as string;

  const { data, isLoading, isPending, isFetching, isError } =
    useGetCreatorPageDataQuery({
      creatorId: creatorId,
    });

  const creatorData = data?.creatorData.data;
  const allCategories = data?.allCategories;
  const creatorSubmissions = data?.creatorSubmissions;

  if (isLoading || isPending || isFetching) {
    return (
      <div className="h-[40vh] grid place-content-center">
        <Loader />
      </div>
    );
  }

  if (!creatorData || !allCategories || !creatorSubmissions || isError) {
    return (
      <div className="h-[40vh] grid place-content-center">
        <p>Some error occured please try again later!</p>
      </div>
    );
  }

  return (
    <div>
      <header className="w-full mb-6 flex flex-col ">
        <div className="w-fit flex items-center opacity-90 cursor-pointer">
          <ChevronLeft className="w-4" />
          <span className="text-xs font-medium ">Back</span>
        </div>
        <h2 className="font-semibold text-2xl sm:text-3xl ">Update Creator</h2>
      </header>

      <CreatorInformationFormContainer creatorData={creatorData} />

      <CreatorCategoriesSettingContainer
        categories={allCategories}
        creatorId={creatorId}
        creatorSubmissions={creatorSubmissions as any}
      />
    </div>
  );
}
