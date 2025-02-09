import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Trophy, Users, Check, Search } from "lucide-react";
import Link from "next/link";
import { getSingleCategoryDataAction } from "@/server/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import VoteConfirmModal from "./__vote-confirm-modal";
import VoteButton from "./_vote-button";
import { redirect } from "next/navigation";
import SearchBar from "./_search-bar";
import { Suspense } from "react";
import ClearSearchButton from "./_clear-search-button";

export default async function CreatorsPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ category_id: string }>;
  searchParams: Promise<{ search: string }>;
}) {
  const categoryId = (await paramsPromise).category_id;
  const searchQuery = (await searchParamsPromise).search || "";

  const {
    categoryInfo,
    creatorsSubmissionsData,
    votedCreatorSubmission,
    votingEndedMessage,
  } = await getSingleCategoryDataAction({ categoryId, searchQuery });

  if (!categoryInfo?.isActive) {
    redirect("/not-found");
  }

  return (
    <div className="py-[100px] md:py-[120px] min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <header className="mb-8 space-y-6 md:space-y-8">
          <div className="flex gap-8 justify-between items-center">
            <Link href="/categories" passHref>
              <Button
                variant="ghost"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
              </Button>
            </Link>
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar initialQuery={searchQuery} />
            </Suspense>{" "}
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-semibold ">
              {categoryInfo?.name}
            </h1>
            <p className="max-md:hidden text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {categoryInfo?.description ||
                `Vote for the creator who pushed creative boundaries and inspired millions`}
            </p>
            {searchQuery && <ClearSearchButton variant={"link"} />}
          </div>
        </header>

        {/* Creator submissons list  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {creatorsSubmissionsData.length === 0 ? (
            <div className="min-h-[40vh] pt-20 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-2xl font-semibold mb-2">Creator Not Found</h2>
              <p className="text-muted-foreground mb-4">
                We couldn't find the creator you're looking for.
              </p>
              {searchQuery && <ClearSearchButton variant={"default"} />}
            </div>
          ) : (
            creatorsSubmissionsData.map((creatorSubmission, index) => (
              <div
                key={creatorSubmission.id}
                className={` ${
                  votedCreatorSubmission?.creatorId ===
                  creatorSubmission.creatorId
                    ? "border-2 border-purple-500 dark:border-purple-400 shadow-lg shadow-purple-500/50"
                    : "border border-gray-200 dark:border-gray-700"
                } p-3 md:p-4 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl flex flex-col`}
              >
                <div className=" flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16 border-2 border-purple-500">
                        <AvatarImage
                          src={creatorSubmission.creator.profilePic}
                          alt={creatorSubmission.creator.name}
                        />
                        <AvatarFallback>
                          {creatorSubmission.creator.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-xl">
                          {creatorSubmission.creator.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          @{creatorSubmission.creator.username}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant="secondary"
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      <Users className="w-4 h-4" />
                      <span>
                        {(+creatorSubmission.creator
                          .followers).toLocaleString()}{" "}
                        followers
                      </span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center space-x-1 px-3 py-1 border-purple-500 text-purple-500"
                    >
                      <Trophy className="w-4 h-4" />
                      <span>{creatorSubmission._count.votes} votes</span>
                    </Badge>
                  </div>

                  <div className="mt-auto">
                    {votingEndedMessage ? (
                      votingEndedMessage
                    ) : (
                      <VoteButton
                        categoryId={categoryId}
                        creatorId={creatorSubmission.creatorId}
                        votedCreatorSubmission={votedCreatorSubmission}
                      />
                    )}

                    {votedCreatorSubmission?.creatorId ===
                      creatorSubmission.creatorId && (
                      <div className="flex items-center justify-center text-purple-500 dark:text-purple-400 font-semibold mt-2">
                        <Check className="w-5 h-5 mr-2" />
                        You voted for this creator
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <VoteConfirmModal categoryId={categoryId} />
      </div>
    </div>
  );
}
