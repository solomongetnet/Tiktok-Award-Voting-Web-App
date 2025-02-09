"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Trophy, Heart, Star } from "lucide-react";

interface TopUser {
  id: number;
  name: string;
  handle: string;
  votes: number;
  avatar: string;
  category: string;
}

const topUsers: TopUser[] = [
  {
    id: 1,
    name: "Dance Master",
    handle: "@dance_master",
    votes: 1000000,
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Best Dance Challenge",
  },
  {
    id: 2,
    name: "Transition Queen",
    handle: "@transition_queen",
    votes: 950000,
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Most Creative Transition",
  },
  {
    id: 3,
    name: "Comedy King",
    handle: "@comedy_king",
    votes: 900000,
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Funniest Skit",
  },
  {
    id: 4,
    name: "Duet Dynamos",
    handle: "@duet_dynamos",
    votes: 850000,
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Best Duet",
  },
  {
    id: 5,
    name: "Inspiration Daily",
    handle: "@inspiration_daily",
    votes: 800000,
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Most Inspiring Content",
  },
  {
    id: 5,
    name: "Inspiration Daily",
    handle: "@inspiration_daily",
    votes: 800000,
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Most Inspiring Content",
  },
];

export function TopVotedCreatorsContainer() {
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8 ">
        Top Voted Creators
      </h2>
      <div className="grid lg:grid-cols-2 gap-6">
        {topUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-white shadow-lg backdrop-blur-lg border-none overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      {index === 0 && (
                        <Trophy className="absolute -top-2 -right-2 w-6 h-6 " />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-sm">{user.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {user.votes.toLocaleString()}
                    </p>
                    <p className="text-sm">votes</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full py-2 flex items-center justify-center"
                  onClick={() =>
                    setExpandedUser(expandedUser === user.id ? null : user.id)
                  }
                >
                  {expandedUser === user.id ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </Button>
                <AnimatePresence>
                  {expandedUser === user.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 py-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="text-primary"
                        >
                          {user.category}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-5 h-5 text-primary" />
                          <span className="text-sm">1.2M likes</span>
                        </div>
                      </div>
                      <p className="text-sm ">
                        Lorem ipsum dolor sit amet, tur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary border-primary"
                        >
                          View Profile
                        </Button>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 "
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TopVotedCreatorsContainer;
