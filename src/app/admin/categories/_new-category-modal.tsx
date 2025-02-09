"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categoriesColorOptions } from "@/constants/categories";
import { useCreateNewCategoryMutation } from "@/hooks/api";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/common/error-message";
import { INewCategory } from "@/interface/category.interface";
import ColorOptionsContainer from "./__color-option-container";
import { toast } from "sonner";

const categoryValidationSchema = yup.object().shape({
  icon: yup.string().required("Icon is required."),
  name: yup.string().required("Name is required."),
  description: yup.string().required("Description is required."),
  maxEntries: yup
    .number()
    .required("Max entries is required.")
    .min(1, "Max entries must be at least 1."),
});

export function NewCategoryModal() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
      description: "",
      icon: "",
      maxEntries: 10,
      name: "",
    },
    resolver: yupResolver(categoryValidationSchema),
  });

  const createNewCategoryMutation = useCreateNewCategoryMutation();
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");

  const onSubmit = async ({
    description,
    icon,
    isActive,
    maxEntries,
    name,
  }: INewCategory) => {
    if (!selectedColor) {
      toast.error("Please select a color.");
      return;
    }
    
    createNewCategoryMutation
      .mutateAsync({
        color: selectedColor,
        description,
        icon,
        isActive,
        maxEntries,
        name,
      })
      .then(({ success }) => {
        if (success) {
          setOpen(false);
          reset();
          setSelectedColor("");
        }
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new category for TikTok creator awards. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit as any)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} className="col-span-3" />
              <ErrorMessage error={errors.name?.message} />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                className="col-span-3"
              />
              <ErrorMessage error={errors.description?.message} />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <Label htmlFor="icon">Icon</Label>
              <Input id="icon" {...register("icon")} className="col-span-3" />
              <ErrorMessage error={errors.icon?.message} />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <Label htmlFor="icon">Max Entires</Label>
              <Input
                id="entires"
                {...register("maxEntries")}
                className="col-span-3"
                placeholder="Enter the max number of entries"
              />
              <ErrorMessage error={errors.maxEntries?.message} />
            </div>

            <ColorOptionsContainer
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              availableColors={categoriesColorOptions}
            />

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive">Active</Label>
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={createNewCategoryMutation.isPending}
            >
              {createNewCategoryMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
