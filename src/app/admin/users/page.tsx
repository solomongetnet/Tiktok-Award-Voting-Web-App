import React, { Suspense } from "react";
import { UsersContainer } from "./_users-container";
import Loader from "@/components/common/loader";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div>
      <header className="w-full mb-6 flex justify-between">
        <h2 className="font-semibold text-2xl sm:text-3xl ">Users</h2>
      </header>

      <div>
        <Suspense
          fallback={
            <div className="h-[40vh] grid place-content-center">
              <Loader />
            </div>
          }
        >
          <UsersContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
