"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import Countdown from "@/components/client/countdown/countdown";
import { useGetAwardEventQuery } from "@/hooks/api/use-award";
import { calculateTimeLeft } from "@/utils/time";

export default function RevealCoutdownContainer() {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState<any | null>(null);

  const eventAwardQuery = useGetAwardEventQuery();

  useEffect(() => {
    if (eventAwardQuery.data) {
      const calculatedTime = calculateTimeLeft(
        new Date(eventAwardQuery.data.endDate)
      );
      setTimeLeft(calculatedTime);
    }
  }, [eventAwardQuery.data]);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    toast.message("Registration Successful!");
    setEmail("");
  };

  return (
    <div className="mx-auto w-full sm:w-[90%] md:w-[500px] flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Results Reveal In
        </h2>

        {eventAwardQuery.isLoading || eventAwardQuery.isError ? (
          <div>Loading event data...</div>
        ) : (
          timeLeft && <Countdown timeLeft={timeLeft} />
        )}
      </div>

      <Card className=" mb-12">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Get Notified
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitEmail}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">
              <Bell className="mr-2 h-4 w-4" /> Notify Me
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
