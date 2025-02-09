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
import { getCreatorsForAdminAction } from "@/server/actions";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteCreatorDialog from "./__delete-creator-dialog";

export async function CreatorsContainer() {
  const { creators } = await getCreatorsForAdminAction();

  if (!creators) {
    return (
      <div className="h-[40vh] grid place-content-center">
        Some error occured
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="h-[40vh] grid place-content-center">
        There are no creators yet
      </div>
    );
  }

  return (
    <div className="space-y-4  shadow-lg rounded-md">
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Followers</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {creators.map((creator, idx: number) => (
            <TableRow key={creator.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarFallback>Profile Picture</AvatarFallback>
                  <AvatarImage src={creator.profilePic} />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{creator.name}</TableCell>
              <TableCell className="text-blue-400 cursor-pointer hover:underline underline-offset-2">
                @{creator.username}
              </TableCell>
              <TableCell>{creator.followers}</TableCell>
              <TableCell className="w-fit">
                <Badge variant="secondary">
                  {creator._count.creatorSubmissions} submissions
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex  space-x-2">
                  <Link href={`/admin/creators/${creator.id}`} passHref>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>

                  <DeleteCreatorDialog creatorId={creator.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
