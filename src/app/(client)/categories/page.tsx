import { Suspense } from "react";
import Loader from "@/components/common/loader";
import CategoriesContainer from "./_categories-container";

export const dynamic = "force-dynamic";

export default function BrowseCategories() {
  return (
    <div className="py-[120px] min-h-screen ">
      <div className="container mx-auto ">
        <header className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            TikTok Awards Categories
          </h1>
          <p className="max-md:hidden text-lg text-gray-600 dark:text-gray-300 leading-tight">
            Explore and vote for your favorite creators in these exciting
            categories!
          </p>
        </header>

        <Suspense
          fallback={
            <div className="h-[40vh] grid place-content-center">
              <Loader />/
            </div>
          }
        >
          <CategoriesContainer />
        </Suspense>
      </div>
    </div>
  );
}
