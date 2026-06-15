import { columns } from "./columns";
import UserTable from "./user-table";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AllUsers() {
  const session = await auth();

  if (session?.user?.role == 0) {
    redirect("/dashboard");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <UserTable columns={columns} />
    </div>
  );
}
