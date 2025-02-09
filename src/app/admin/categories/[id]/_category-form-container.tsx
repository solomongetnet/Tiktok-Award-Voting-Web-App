"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { categoriesColorOptions } from "@/constants/categories";
import { useUpdateCategoryMutation } from "@/hooks/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/common/error-message";
import { ICategory, IUpdateCategory } from "@/interface/category.interface";
import ColorOptionsContainer from "./__color-option-container";

const categoryValidationSchema = yup.object().shape({
  icon: yup.string().required("Icon is required."),
  name: yup.string().required("Name is required."),
  description: yup.string().notRequired(),
  maxEntries: yup
    .number()
    .required("Max entries is required.")
    .min(1, "Max entries must be at least 1."),
});

export default function CategoryFormContainer({
  categoryData,
}: {
  categoryData: ICategory;
}) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      description: categoryData.description,
      icon: categoryData.icon,
      maxEntries: categoryData.maxEntries,
      name: categoryData.name,
    },
    resolver: yupResolver(categoryValidationSchema),
  });

  const updateCategoryMutation = useUpdateCategoryMutation();

  const [isActive, setIsActive] = useState(categoryData.isActive);
  const [selectedColor, setSelectedColor] = useState(categoryData.color);

  const onSubmit = async ({
    description,
    icon,
    maxEntries,
    name,
  }: IUpdateCategory) => {
    updateCategoryMutation.mutateAsync({
      categoryId: categoryData.id,
      data: {
        color: selectedColor,
        description,
        icon,
        isActive,
        maxEntries,
        name,
      },
    });
  };

  return (
    <div className="mb-8 px-4 py-8 bg-white rounded-md">
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            <ErrorMessage error={errors.name?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input id="icon" {...register("icon")} />
            <ErrorMessage error={errors.icon?.message} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} rows={4} />
          <ErrorMessage error={errors.description?.message} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="maxEntries">Max Entries</Label>
            <Input
              id="maxEntries"
              type="number"
              {...register("maxEntries")}
              placeholder="Enter the max number of entries"
            />
            <ErrorMessage error={errors.maxEntries?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isActive">Active</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <span>{isActive ? "Active" : "Inactive"}</span>
            </div>
          </div>
        </div>

        <ColorOptionsContainer
          currentColor={categoryData.color}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          availableColors={categoriesColorOptions}
        />

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={updateCategoryMutation.isPending}
        >
          {updateCategoryMutation.isPending ? "Saving..." : "Update Category"}
        </Button>
      </form>
    </div>
  );
}
