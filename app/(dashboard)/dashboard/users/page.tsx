import { fetchUsers } from "@/app/actions/user-actions";
import { columns } from "./columns";
import UserTable from "./user-table";

export default async function AllUsers() {
  const res = await fetchUsers();
  const users = res.data;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {users.length ? (
        <UserTable columns={columns} data={users} />
      ) : (
        <span>No users yet...</span>
      )}
    </div>
  );
}
