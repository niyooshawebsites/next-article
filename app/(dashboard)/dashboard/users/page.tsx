import { fetchUsers } from "@/app/actions/user-actions";
import { columns } from "./columns";
import UserTable from "./user-table";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AllUsers() {
  const session = await auth();
  console.log("SESSION START...........................");
  console.log(session);
  console.log("SESSION END...........................");

  if (session?.user?.role == 0) {
    redirect("/dashboard");
  }

  const res = await fetchUsers();
  const users = res.data;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {users.length ? (
        <UserTable columns={columns} />
      ) : (
        <span>No users yet...</span>
      )}
    </div>
  );
}
