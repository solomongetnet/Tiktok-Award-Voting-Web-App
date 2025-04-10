import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getUsersForAdminAction } from "@/server/actions";
import { RoleChanger } from "./__role-changer";

export async function UsersContainer() {
  const users = await getUsersForAdminAction({});

  if (!users) {
    return (
      <div className="h-[40vh] grid place-content-center">
        Some error occurred
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="h-[40vh] grid place-content-center">
        There are no users yet
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
            <TableHead>Email</TableHead>
            <TableHead>Votes</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, idx: number) => (
            <TableRow key={user.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="font-medium">{user.name || "_"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">{user._count.votes} votes</Badge>
              </TableCell>
              <TableCell>{user.provider}</TableCell>
              <TableCell>{user.role}</TableCell>

              <TableCell>
                <div className="space-x-2">
                  {/* Role changer button */}
                  <RoleChanger userId={user.id} currentRole={user.role} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
