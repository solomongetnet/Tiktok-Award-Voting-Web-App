"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSubmitVoteMutation } from "@/hooks/api";
import { CheckCircle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSingleCategorySubmissionAction } from "@/server/actions/creator-submissions.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const VoteConfirmModal = ({ categoryId }: { categoryId: string }) => {
  const submitVoteMutation = useSubmitVoteMutation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const creatorIdToSubmit = searchParams.get("creatorIdToSubmit");

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  useEffect(() => {
    creatorIdToSubmit ? setIsOpen(true) : setIsOpen(false);
  }, [creatorIdToSubmit, searchParams]);

  const { data: submissionData, isLoading } = useQuery({
    queryKey: ["categorySubmission", categoryId, creatorIdToSubmit],
    queryFn: () =>
      getSingleCategorySubmissionAction({
        categoryId,
        creatorId: creatorIdToSubmit as string,
      }),
    enabled: !!creatorIdToSubmit && !!categoryId,
  });

  const handleCancelVote = () => {
    setIsOpen(false);
    router.replace(`${pathname}`);
  };

  const handleSubmitVote = () => {
    submitVoteMutation.mutate(
      {
        categoryId,
        creatorId: creatorIdToSubmit as string,
      },
      {
        onSuccess: ({ success }) => {
          if (success) {
            setIsAnimationVisible(true);
            setTimeout(() => {
              setIsAnimationVisible(false);
              router.replace(`${pathname}`);
            }, 3000);
            setIsOpen(false);
          }
        },
      }
    );
  };

  const selectedCreator = submissionData?.creator;

  return (
    <>
      <Dialog
        open={!!isOpen}
        onOpenChange={() => {
          setIsOpen(false);
          router.replace(`${pathname}`);
        }}
      >
        <DialogContent className="rounded-lg w-[90%] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Vote Now</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to vote for this creator? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : selectedCreator ? (
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>Profile Image</AvatarFallback>
                  <AvatarImage src={selectedCreator.profilePic} />
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedCreator.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    @{selectedCreator.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    {Number(selectedCreator.followers).toLocaleString()}{" "}
                    followers
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 mb-6 text-center text-gray-500">
              No creator data available in this category
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button
              onClick={handleSubmitVote}
              disabled={submitVoteMutation.isPending || isLoading}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold"
            >
              {submitVoteMutation.isPending ? "Loading..." : "Confirm Vote"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {isAnimationVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              className="p-8 bg-white rounded-2xl shadow-2xl text-center max-w-md w-full mx-4"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                Thank You!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Your vote has been successfully recorded.
              </p>
              <motion.div
                className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
              >
                <div className="h-full bg-gradient-to-r from-pink-500 to-violet-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoteConfirmModal;
