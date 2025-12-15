import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return <h1>Admin Dashboard</h1>;
}
