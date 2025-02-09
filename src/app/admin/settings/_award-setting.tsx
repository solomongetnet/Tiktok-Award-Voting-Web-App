"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Loader from "@/components/common/loader";
import {
  useGetAwardEventQuery,
  useUpsertAwardEventMutation,
} from "@/hooks/api/use-award";

export function AwardEventForm() {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    startDate: any;
    endDate: any;
    isActive?: boolean;
  }>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  // Fetch the current award event
  const awardEventQuery = useGetAwardEventQuery();
  // Mutation for upserting the award event
  const upsertAwardEventMutation = useUpsertAwardEventMutation();

  useEffect(() => {
    if (awardEventQuery.data) {
      setFormData({
        name: awardEventQuery.data.name,
        description: awardEventQuery.data.description,
        startDate: new Date(awardEventQuery.data.startDate)
          .toISOString()
          .slice(0, 16),
        endDate: new Date(awardEventQuery.data.endDate)
          .toISOString()
          .slice(0, 16),
        isActive: awardEventQuery.data.isActive,
      });
    }
  }, [awardEventQuery.data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert("Start date must be before the end date.");
      return;
    }

    upsertAwardEventMutation.mutate(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Award Event</CardTitle>
        <CardDescription>Set the details for the award event</CardDescription>
      </CardHeader>
      <CardContent>
        {awardEventQuery.isLoading || awardEventQuery.isFetching ? (
          <div className="py-2 grid place-content-center">
            <Loader />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isActive">Active</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isActive: checked }))
                  }
                />
                <span>{formData.isActive ? "Active" : "Inactive"}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={upsertAwardEventMutation.isPending}
          className="w-full"
        >
          {upsertAwardEventMutation.isPending ? "Updating..." : "Update Event"}
        </Button>
      </CardFooter>
    </Card>
  );
}
