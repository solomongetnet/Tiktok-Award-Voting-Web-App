"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUpdateCreatorInfromationMutation } from "@/hooks/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/common/error-message";
import { ICreator, IUpdateCreator } from "@/interface/creator.interface";

const creatorValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  username: yup.string().required("Username is required."),
  followers: yup.string().required("Followers is required."),
  description: yup.string().notRequired(),
});

export default function CategoryFormContainer({
  creatorData,
}: {
  creatorData: ICreator;
}) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      description: creatorData.description,
      name: creatorData.name,
      followers: creatorData.followers,
      username: creatorData.username,
    },
    resolver: yupResolver(creatorValidationSchema),
  });

  const updateCreatorInfromationMutation = useUpdateCreatorInfromationMutation();

  const onSubmit = async ({
    description,
    name,
    followers,
    username,
  }: IUpdateCreator) => {
    updateCreatorInfromationMutation.mutate({
      creatorId: creatorData.id,
      data: {
        description,
        name,
        followers,
        username,
      },
    });
  };

  return (
    <div className="px-4 py-8 bg-white rounded-md">
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            <ErrorMessage error={errors.name?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} />
            <ErrorMessage error={errors.username?.message} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} rows={4} />
          <ErrorMessage error={errors.description?.message} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="followers">Followers</Label>
            <Input
              id="followers"
              type="string"
              {...register("followers")}
              placeholder="0"
            />
            <ErrorMessage error={errors.followers?.message} />
          </div>
        </div>

        <div className="w-full flex md:justify-end">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={updateCreatorInfromationMutation.isPending}
          >
            {updateCreatorInfromationMutation.isPending ? "Saving..." : "Update Creator"}
          </Button>
        </div>
      </form>
    </div>
  );
}
