import React, { Suspense } from "react";
import { NewCategoryModal } from "./_new-category-modal";
import Loader from "@/components/common/loader";
import { CategoriesContainer } from "./_categories-container";
import StatsContainer from "./_stats-container";

const page = () => {
  return (
    <div>
      <header className="w-full mb-6 flex justify-between">
        <h2 className="font-semibold text-2xl sm:text-3xl ">Categories</h2>
        <NewCategoryModal />
      </header>

      <Suspense
        fallback={
          <div className="h-[40vh] grid place-content-center">
            <Loader />
          </div>
        }
      >
        <StatsContainer />

        <CategoriesContainer />
      </Suspense>
    </div>
  );
};

export default page;
