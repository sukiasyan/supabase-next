import Profile from "@/components/Profile";
import Link from "next/link";

export default function Navbar() {
  return (
      <div className="flex items-center justify-between ">
        <Link href="/">
          <h1 className="text-xl font-bold">Logo</h1>
        </Link>
        <Profile />
      </div>
  )
}