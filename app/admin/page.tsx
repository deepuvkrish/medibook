import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function AdminPage() {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className="flex w-full flex-col p-5">
      <h1 className="text-9xl font-bold">Admin Page</h1>

      <div className="my-8 flex justify-around w-full">
        <Link
          href="/admin/audit-logs"
          className="border-r border-l border-b px-5 border-gray-500 text-3xl"
        >
          Audit Logs
        </Link>
      </div>
    </div>
  );
}
