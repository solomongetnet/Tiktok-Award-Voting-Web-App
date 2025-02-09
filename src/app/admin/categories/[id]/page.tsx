"use client";

import Loader from "@/components/common/loader";
import { useGetSingleCategoryQuery } from "@/hooks/api";
import CategoryFormContainer from "./_category-form-container";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ParticipantsContainer } from "./_participants-container";

export default function UpdateCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const { data, isLoading, isPending, isFetching, isError } =
    useGetSingleCategoryQuery({
      categoryId: categoryId,
    });

  if (isLoading || isPending || isFetching) {
    return (
      <div className="h-[40vh] grid place-content-center">
        <Loader />
      </div>
    );
  }

  if (!data || isError) {
    return (
      <div className="h-[40vh] grid place-content-center">
        <p>Category not found</p>
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
        <h2 className="font-semibold text-2xl sm:text-3xl ">Update Category</h2>
      </header>

      <CategoryFormContainer categoryData={data} />

      <ParticipantsContainer categoryId={categoryId} />
    </div>
  );
}
