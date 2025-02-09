import { MetricCard } from "@/components/common/metric-card";
import { getAdminCategoriesStatsAction } from "@/server/actions";
import React from "react";
import { PlayCircle, Trophy, Users, ThumbsUp } from "lucide-react";

const StatsContainer = async () => {
  const { categoriesCount, activeCategories, inactiveCategories } =
    await getAdminCategoriesStatsAction();

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        icon={Trophy}
        value={categoriesCount}
        label={"Total Categories"}
        change={{ trend: "down", value: 0.5 }}
      />
      <MetricCard
        icon={PlayCircle}
        value={inactiveCategories}
        label={"Inactive Categories"}
        change={{ trend: "up", value: 1.25 }}
      />
      <MetricCard
        icon={Users}
        value={activeCategories}
        label={"Active Categories"}
        change={{ trend: "down", value: 2 }}
      />
    </div>
  );
};

export default StatsContainer;
