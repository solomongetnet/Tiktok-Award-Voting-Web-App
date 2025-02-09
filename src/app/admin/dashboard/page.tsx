import { Suspense } from "react";
import ChartOverview from "./_chart";
import StatsContainer from "./_stats-container";

const page = () => {
  return (
    <div>
      <header className="mb-6">
        <h2 className="font-semibold text-2xl sm:text-3xl ">Dashboard</h2>
      </header>

      <div className="space-y-2">
        <Suspense fallback={<div className="min-h-[20vh]"></div>}>
          <StatsContainer />
        </Suspense>

        <ChartOverview />
      </div>
    </div>
  );
};

export default page;
