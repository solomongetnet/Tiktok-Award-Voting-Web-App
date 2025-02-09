import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Trophy, Star, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

interface AwardWinner {
  category: string;
  winner: string;
  tiktokHandle: string;
  votes: number;
  avatar: string;
}

const awardWinners: AwardWinner[] = [
  {
    category: "Best Dance Challenge",
    winner: "Dance Master",
    tiktokHandle: "@dance_master",
    votes: 1000000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    category: "Most Creative Transition",
    winner: "Transition Queen",
    tiktokHandle: "@transition_queen",
    votes: 750000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    category: "Funniest Skit",
    winner: "Comedy King",
    tiktokHandle: "@comedy_king",
    votes: 890000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    category: "Best Duet",
    winner: "Duet Dynamos",
    tiktokHandle: "@duet_dynamos",
    votes: 680000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    category: "Most Inspiring Content",
    winner: "Inspiration Daily",
    tiktokHandle: "@inspiration_daily",
    votes: 920000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

const ResultsContainer = () => {
  const [selectedWinner, setSelectedWinner] = useState<AwardWinner | null>(
    null
  );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {awardWinners.map((winner, index) => (
          <motion.div
            key={winner.category}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className=" transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-pink-500">
                    <AvatarImage src={winner.avatar} alt={winner.winner} />
                    <AvatarFallback>{winner.winner[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{winner.category}</h2>
                    <p className="text-sm text-gray-400">
                      {winner.tiktokHandle}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-medium mb-4">{winner.winner}</p>
                <Button
                  variant="outline"
                  className="w-full border-primary hover:border-primary/70 text-primary"
                  onClick={() => setSelectedWinner(winner)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog
        open={selectedWinner !== null}
        onOpenChange={() => setSelectedWinner(null)}
      >
        <DialogContent className="border-primary/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>{selectedWinner?.category}</span>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Award details and winner information
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-16 w-16 border-2 border-pink-500">
                <AvatarImage
                  src={selectedWinner?.avatar}
                  alt={selectedWinner?.winner}
                />
                <AvatarFallback>{selectedWinner?.winner[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedWinner?.winner}
                </h3>
                <p className="text-primary">{selectedWinner?.tiktokHandle}</p>
              </div>
            </div>
            <div className=" rounded-lg p-4 mb-6">
              <p className="text-lg mb-2">Total Votes</p>
              <p className="text-3xl font-bold text-primary">
                {selectedWinner?.votes.toLocaleString()}
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() =>
                window.open(
                  `https://www.tiktok.com/${selectedWinner?.tiktokHandle.slice(
                    1
                  )}`,
                  "_blank"
                )
              }
            >
              View TikTok Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResultsContainer;
