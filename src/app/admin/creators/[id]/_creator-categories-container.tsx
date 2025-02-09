"use client";

import { ICategory } from "@/interface/category.interface";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Plus, X, Loader, ThumbsUp, Award, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useAssignCreatorToCategoryMutation,
  useRemoveCreatorFromCategoryMutation,
} from "@/hooks/api";
import { ICreatorSubmission } from "@/interface/submission.interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CreatorCategoriesSettingContainer = ({
  categories,
  creatorSubmissions,
  creatorId,
}: {
  categories: ICategory[];
  creatorSubmissions: ICreatorSubmission[];
  creatorId: string;
}) => {
  const assignCreatorToCategoryMutation = useAssignCreatorToCategoryMutation();
  const removeCreatorFromCategoryMutation =
    useRemoveCreatorFromCategoryMutation();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignToCategory = (category: ICategory) => {
    assignCreatorToCategoryMutation.mutate({
      categoryId: category.id,
      creatorId: creatorId,
    });
  };

  const handleRemove = (categoryId: string) => {
    removeCreatorFromCategoryMutation.mutate({
      categoryId,
      creatorId: creatorSubmissions[0].creatorId,
    });
  };

  return (
    <div className="mt-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Creator Categories
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="shadow-lg h-fit">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Available Categories
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <ScrollArea className="h-[350px] pr-4">
              <AnimatePresence>
                {filteredCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="mb-3"
                  >
                    <Card>
                      <CardContent className="flex justify-between items-center p-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: category.color }}
                          ></div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAssignToCategory(category)}
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 transition-colors"
                              >
                                <Plus size={20} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Assign to category</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="shadow-lg h-fit">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Creator Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px] pr-4">
              {creatorSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No assigned categories
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {creatorSubmissions.map((submission: ICreatorSubmission) => (
                    <motion.div
                      key={submission.category.id + submission.creatorId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="mb-3"
                    >
                      <Card>
                        <CardContent className="flex justify-between items-center p-4">
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-3 mb-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  background: submission.category.color,
                                }}
                              ></div>
                              <span className="font-medium">
                                {submission.category.name}
                              </span>
                            </div>
                            <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-300">
                              <div className="flex items-center">
                                <ThumbsUp size={16} className="mr-1" />
                                <span>{submission._count?.votes}</span>
                              </div>
                              <div className="flex items-center">
                                <Hash size={16} className="mr-1" />
                                <span>{submission.id}</span>
                              </div>
                            </div>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  disabled={
                                    removeCreatorFromCategoryMutation.variables
                                      ?.categoryId === submission.category.id
                                  }
                                  onClick={() =>
                                    handleRemove(submission.category.id)
                                  }
                                >
                                  {removeCreatorFromCategoryMutation.variables
                                    ?.categoryId === submission.category.id ? (
                                    <Loader
                                      size={20}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <X size={20} />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove from category</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorCategoriesSettingContainer;
