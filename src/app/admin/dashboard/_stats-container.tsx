import { MetricCard } from "@/components/common/metric-card";
import { getAdminDashboardStatsAction } from "@/server/actions";
import React from "react";
import { PlayCircle, Trophy, Users, ThumbsUp } from "lucide-react";

const StatsContainer = async () => {
  const { categoriesCount, creatorCount, creatorSubmissionsCount, votesCount } =
    await getAdminDashboardStatsAction();
  const change = {
    value: 1.25,
    trend: "down",
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        icon={PlayCircle}
        value={creatorSubmissionsCount}
        label={"Total Submissons"}
        change={{ trend: "up", value: 1.25 }}
      />
      <MetricCard
        icon={Trophy}
        value={categoriesCount}
        label={"Total Categories"}
        change={{ trend: "down", value: 0.50 }}
      />
      <MetricCard
        icon={Users}
        value={creatorCount}
        label={"Participants"}
        change={{ trend: "down", value: 2 }}
      />
      <MetricCard
        icon={ThumbsUp}
        value={votesCount}
        label={"Vote Count"}
        change={{ trend: "up", value: 1.75 }}
      />
    </div>
  );
};

export default StatsContainer;
