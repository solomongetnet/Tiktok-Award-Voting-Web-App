"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { changeUserRoleAction } from "@/server/actions"; // Adjust import path if needed
import { toast } from "sonner";

type RoleChangerProps = {
  userId: string;
  currentRole: string;
};

export const RoleChanger = ({ userId, currentRole }: RoleChangerProps) => {
  const [role, setRole] = useState(currentRole);

  const mutation = useMutation({
    mutationFn: ({ newRole, userId }: { newRole: any; userId: string }) =>
      changeUserRoleAction({ newRole, userId }),
    onSuccess: (data) => {
      if (data.data && data.success) {
        setRole(data?.data?.newRole);
        toast.success("Role updated successfully!");
      } else {
        toast.error(data.error?.message || "Failed to update role");
      }
    },
  });

  const handleRoleChange = async (newRole: string) => {
    if (newRole === role) return; // No change if the same role

    mutation.mutate({ userId, newRole });
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleRoleChange("ADMIN")}
        disabled={mutation.isPending || role === "ADMIN"}
      >
        {mutation.isPending ? "Updating..." : "Admin"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleRoleChange("USER")}
        disabled={mutation.isPending || role === "USER"}
      >
        {mutation.isPending ? "Updating..." : "User"}
      </Button>
    </div>
  );
};
