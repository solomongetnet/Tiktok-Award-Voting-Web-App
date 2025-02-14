"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { PlusCircle, Loader2 } from "lucide-react";

import {
  getCreatorsForAdminAction,
  assignCreatorToCategoryAction,
} from "@/server/actions";
import { Creator } from "@prisma/client";
import { toast } from "sonner";

const AddCreatorModal = ({ categoryId }: { categoryId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: creatorsData, isLoading: isLoadingCreators } = useQuery({
    queryKey: ["adminCreators", searchTerm],
    queryFn: () => getCreatorsForAdminAction(searchTerm),
    enabled: isOpen,
  });

  const addCreatorMutation = useMutation({
    mutationFn: ({
      creatorId,
      categoryId,
    }: {
      creatorId: string;
      categoryId: string;
    }) => assignCreatorToCategoryAction({ creatorId, categoryId }),
    onSuccess: (data) => {
      if (data.success) {
        toast(data.message);
        queryClient.invalidateQueries({ queryKey: ["adminCreators"] });
        queryClient.invalidateQueries({ queryKey: ["creatorSubmissions"] });
      } else {
        toast(data.error?.message || "An error occurred");
      }
    },
    onError: (error) => {
      toast(error.message || "An error occurred");
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCreator = (creator: Creator) => {
    addCreatorMutation.mutate({
      creatorId: creator.id,
      categoryId,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
          Add New Creator
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-md max-md:w-[90%]">
        <DialogHeader>
          <DialogTitle>Add Creator to Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search creators..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <ScrollArea className="flex-1 mt-4 max-h-[60vh]">
          {isLoadingCreators ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            creatorsData?.creators &&
            creatorsData?.creators.map((creator) => (
              <div
                key={creator.id}
                className="flex items-center justify-between p-2 border-b"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={creator.profilePic || "/placeholder-avatar.png"}
                    alt={creator.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{creator.name}</p>
                    <p className="text-sm text-gray-500">@{creator.username}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleAddCreator(creator)}
                  disabled={addCreatorMutation.isPending}
                >
                  {addCreatorMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <PlusCircle className="h-5 w-5" />
                  )}
                </Button>
              </div>
            ))
          )}
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreatorModal;
