import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Edit, Trash2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getCategoryParticipantsAction } from "@/server/actions";
import Loader from "@/components/common/loader";
import AddCreatorModal from "./__add-creator-modal";
import { useRemoveCreatorFromCategoryMutation } from "@/hooks/api";

export function ParticipantsContainer({ categoryId }: { categoryId: string }) {
  const {
    data: participantsData,
    isLoading,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryFn: () => getCategoryParticipantsAction({ categoryId }),
    queryKey: ["creatorSubmissions"],
  });

  const removeCreatorFromCategoryMutation =
    useRemoveCreatorFromCategoryMutation();

  if (isLoading || isPending || isFetching) {
    return (
      <div className="h-[40vh] grid place-content-center">
        <Loader />
      </div>
    );
  }

  if (!participantsData || isError) {
    return (
      <div className="h-[40vh] grid place-content-center">
        <p>Category not found</p>
      </div>
    );
  }
  const handleRemoveCreatorFromCategory = (creatorId: string) => {
    removeCreatorFromCategoryMutation.mutate({ categoryId, creatorId });
  };

  return (
    <div className="space-y-6 bg-white p-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search creators..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        <AddCreatorModal categoryId={categoryId} />
      </div>
      <div className="rounded-md border overflow-hidden">
        {participantsData.length === 0 ? (
          <div className="py-16 grid place-content-center">
            <h2 className="text-base">
              There is no participant in this category
            </h2>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {participantsData.map((participant) => (
                  <motion.tr
                    key={participant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell className="font-medium min-w-fit">
                      <Badge>{participant.rank}</Badge>
                    </TableCell>
                    <TableCell className="font-medium min-w-fit">
                      {participant.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={participant.creator.profilePic}
                            alt={participant.creator.name}
                          />
                          <AvatarFallback>
                            {participant.creator.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">
                            {participant.creator.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{participant.creator.username}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-semibold">
                        {participant._count.votes.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        {Number(participant.creator.followers).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-100"
                        onClick={() =>
                          handleRemoveCreatorFromCategory(participant.creatorId)
                        }
                        disabled={
                          removeCreatorFromCategoryMutation.variables
                            ?.creatorId === participant.creatorId
                        }
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
