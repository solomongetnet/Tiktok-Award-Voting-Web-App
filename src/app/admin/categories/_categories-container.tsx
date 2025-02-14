import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { getCategoriesForAdminAction } from "@/server/actions";
import DeleteCategoryDialog from "./__delete-category-dialog";
import Link from "next/link";

export async function CategoriesContainer() {
  const categories = await getCategoriesForAdminAction();

  if (categories.length === 0) {
    return (
      <div className="h-[40vh] grid place-content-center">
        There is no any category
      </div>
    );
  }

  return (
    <div className="space-y-4 shadow-lg rounded-md">
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Max Entries</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, idx) => (
            <TableRow key={category.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell className="min-w-[300px]">
                <Badge variant={'secondary'}>{category._count.creatorSubmission} Submissions</Badge>
              </TableCell>
              <TableCell>{category.maxEntries}</TableCell>
              <TableCell>
                <Badge
                  variant={category.isActive ? "success" : ("secondary" as any)}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.color}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/categories/${category.id}`} passHref>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>

                  <DeleteCategoryDialog categoryId={category.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
