

import Link from "next/link";
import {FaGithub, FaYoutube} from "react-icons/fa";
import Price from "@/components/subscription/price";

export default function Home() {

  return (
      <div className="space-y-10">
        <div>
          <h1 className="text-xl font-bold">Test links</h1>
          <div className=" space-x-2">
            <Link href="/dashboard" className="underline">
              /dashboard
            </Link>
            <Link href="/profile" className=" underline">
              /profile
            </Link>
            <Link href="/supscription" className=" underline">
              /subscription
            </Link>
          </div>
        </div>
        <Price />
        <div className=" border-t pt-10">
          <h1 className="text-xl font-bold">
            Thank you cloning my boilerplate project.
          </h1>
          <p>If you want to support me. Follow me here</p>
          <div className="mt-5">
            <div className="flex items-center gap-5">
              <Link
                  href={"https://www.youtube.com/c/DailyWebCoding"}
                  target="_blank"
              >
                <FaYoutube className="h-8 w-8 hover:scale-105" />
              </Link>
              <Link
                  href={"https://github.com/Chensokheng"}
                  target="_blank"
              >
                <FaGithub className="h-8 w-8 hover:scale-105" />
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}