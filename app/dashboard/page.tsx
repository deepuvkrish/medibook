import { signOut } from "@/auth";
import bcrypt from "bcrypt";

export default async function page() {
  console.log(await bcrypt.hash("agetdata@787", 10));
  return (
    <>
      <h1>Welcome to MediBook </h1>
    </>
  );
}
