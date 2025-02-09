"use client";

import { useQuery } from "@tanstack/react-query";
import Countdown from "@/components/client/countdown/countdown";
import { getAwardEventAction } from "@/server/actions";
import { useEffect, useState } from "react";
import { calculateTimeLeft, TimeLeft } from "@/utils/time";

const AwardEventPage = () => {
  const {
    data: eventData,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getAwardEventAction,
    queryKey: [""],
  });
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (eventData) {
      const calculatedTime = calculateTimeLeft(new Date(eventData.endDate));
      setTimeLeft(calculatedTime);
    }
  }, [eventData]);

  if (isLoading) return <div>Loading event data...</div>;
  if (isError) return <div>Error loading event data.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Award Event Countdown</h1>
      {timeLeft && (
        <Countdown
          size="lg"
          backgroundColor="bg-blue-500"
          textColor="text-white"
          accentColor="bg-blue-300"
          timeLeft={timeLeft}
        />
      )}
    </div>
  );
};

export default AwardEventPage;
