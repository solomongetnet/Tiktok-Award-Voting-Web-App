import { useState } from "react";
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
import {
  useGetCurrentVotingEndDateQuery,
  updateVotingEndDateSettingMutation,
  useRemoveVotingEndDateSettingMutation,
} from "@/hooks/api";
import Loader from "@/components/common/loader";
import { Loader2, Trash2 } from "lucide-react";

export function VotingEndDateSetting() {
  const [votingEndDate, setVotingEndDate] = useState("");

  const updateVotingEndDateMutation = updateVotingEndDateSettingMutation();
  const deleteVotingEndDateMutation = useRemoveVotingEndDateSettingMutation();
  const getCurrentVotingEndDateQuery = useGetCurrentVotingEndDateQuery();

  const handleSubmit = () => {
    updateVotingEndDateMutation.mutate({
      votingEndDate: new Date(votingEndDate),
    });
  };

  const handleRemove = () => {
    deleteVotingEndDateMutation.mutateAsync().then(({ success }) => {
      if (success) {
        setVotingEndDate("");
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Voting End Date</CardTitle>
        <CardDescription>Set the end date for voting</CardDescription>
      </CardHeader>
      <CardContent className="h-fit">
        {getCurrentVotingEndDateQuery.isLoading ||
        getCurrentVotingEndDateQuery.isFetching ? (
          <div className="py-2 grid place-content-center">
            <Loader />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="votingEndDate">Voting End Date</Label>

            <div className="flex gap-2">
              <Input
                className="flex-1"
                id="votingEndDate"
                type="datetime-local"
                value={
                  votingEndDate ||
                  (getCurrentVotingEndDateQuery.data
                    ? new Date(getCurrentVotingEndDateQuery.data)
                        .toISOString()
                        .slice(0, 16)
                    : "")
                }
                onChange={(e) => setVotingEndDate(e.target.value)}
                disabled={
                  getCurrentVotingEndDateQuery.isLoading ||
                  getCurrentVotingEndDateQuery.isFetching
                }
              />
              <Button
                onClick={handleRemove}
                disabled={deleteVotingEndDateMutation.isPending}
                size={"icon"}
                variant={"destructive"}
              >
                {deleteVotingEndDateMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 />
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={updateVotingEndDateMutation.isPending}
          className="w-full"
        >
          {updateVotingEndDateMutation.isPending ? "Update..." : "Update End Date"}
        </Button>
      </CardFooter>
    </Card>
  );
}
