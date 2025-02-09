"use client";

import { Button } from "@/components/ui/button";
import { showModal } from "@/store/slices";
import { Heart, Trophy } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface IVotedCreatorSubmission {
  creatorId: string;
  categoryId: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

const VoteButton = ({
  creatorId,
  votedCreatorSubmission,
}: {
  creatorId: string;
  categoryId: string;
  votedCreatorSubmission?: IVotedCreatorSubmission | null;
}) => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const sessionIsLoading = sessionStatus === "loading";
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleVoteButton = () => {
    if (sessionStatus === "loading") {
      return;
    } else if (sessionStatus === "authenticated") {
      const searchParams = new URLSearchParams();
      searchParams.append("creatorIdToSubmit", creatorId);
      router.replace(`${pathname}?creatorIdToSubmit=${creatorId}`);
    } else if (sessionStatus === "unauthenticated") {
      dispatch(showModal("loginModal"));
    }
  };

  return (
    <Button
      className="w-full"
      onClick={() => handleVoteButton()}
      disabled={sessionIsLoading || !!votedCreatorSubmission}
    >
      {sessionIsLoading ? (
        "Loading..."
      ) : votedCreatorSubmission?.creatorId === creatorId ? (
        <>
          <Heart className="w-4 h-4 mr-2 fill-current" />
          Voted
        </>
      ) : (
        <>
          <Trophy className="w-4 h-4 mr-2" />
          Vote
        </>
      )}
    </Button>
  );
};

export default VoteButton;
