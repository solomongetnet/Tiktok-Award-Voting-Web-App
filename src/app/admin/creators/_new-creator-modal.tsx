"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateNewCreatorMutation } from "@/hooks/api";
import { Delete, Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/common/error-message";
import { INewCreator } from "@/interface/creator.interface";
import Image from "next/image";
import { toast } from "sonner";

const creatorValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  description: yup.string().required("Description is required."),
  username: yup.string().required("Username is required."),
  followers: yup.string().required("Followers count is required."),
});

export function NewCreatorModal() {
  const [imageFile, setImageFile] = useState<Blob | undefined>();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<INewCreator>({
    defaultValues: {
      name: "",
      description: "",
      username: "",
      followers: "",
    },
    resolver: yupResolver(creatorValidationSchema),
  });

  const createNewCreatorMutation = useCreateNewCreatorMutation();
  const [open, setOpen] = useState(false);

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setImageFile(files[0]);
    }
  };

  const handleRemoveSelectedImageFile = () => {
    setImageFile(undefined);
  };

  const onSubmit = async (data: INewCreator) => {
    if (!imageFile) {
      toast.message("Profile image is required");
      return;
    }

    const formData = new FormData();

    formData.append("image", imageFile);

    createNewCreatorMutation
      .mutateAsync({ data, formData })
      .then(({ success }) => {
        if (success) {
          setOpen(false);
          reset();
        }
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 h-[90vh] flex flex-col">
        <div className="p-6 overflow-y-auto flex-grow">
          <DialogHeader>
            <DialogTitle>Add New Creator</DialogTitle>
            <DialogDescription>
              Create a new TikTok creator profile. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                <ErrorMessage error={errors.name?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} />
                <ErrorMessage error={errors.description?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" {...register("username")} />
                <ErrorMessage error={errors.username?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="followers">Followers</Label>
                <Input
                  id="followers"
                  {...register("followers")}
                  placeholder="Enter the number of followers"
                />
                <ErrorMessage error={errors.followers?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilePic">Profile Picture</Label>
                {!imageFile && (
                  <Input
                    type="file"
                    multiple={false}
                    onChange={handleImageFileChange}
                  />
                )}
                {imageFile && (
                  <div className="flex flex-col gap-7 relative rounded-2xl w-[100px]">
                    <Image
                      width={400}
                      height={400}
                      src={URL.createObjectURL(imageFile)}
                      alt="image"
                      className="size-full object-cover"
                    />
                    <Button
                      className="absolute top-[5px] right-[-50%]"
                      size={"icon"}
                      onClick={handleRemoveSelectedImageFile}
                    >
                      <Trash />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="p-6 bg-background border-t">
          <Button
            type="submit"
            className="w-full"
            disabled={createNewCreatorMutation.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {createNewCreatorMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
