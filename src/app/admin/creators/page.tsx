import React, { Suspense } from "react";
import { NewCreatorModal } from "./_new-creator-modal";
import { CreatorsContainer } from "./_creators-container";
import Loader from "@/components/common/loader";

const page = () => {
  return (
    <div>
      <header className="w-full mb-6 flex justify-between">
        <h2 className="font-semibold text-2xl sm:text-3xl ">Creators</h2>
        <NewCreatorModal />{" "}
      </header>

      <div>
        <Suspense
          fallback={
            <div className="h-[40vh] grid place-content-center">
              <Loader />
            </div>
          }
        >
          <CreatorsContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
