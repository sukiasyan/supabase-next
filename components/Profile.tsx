"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import useUser from "@/app/useUser";
import Image from "next/image";
import {useQueryClient} from "@tanstack/react-query";
import {supabaseBrowser} from "@/lib/supabase/browser";
import {usePathname, useRouter} from "next/navigation"
import {protectedPaths} from "@/lib/constant";

export default function Profile() {
  const {isFetching, data} = useUser();
  const queryClient = useQueryClient()
  const router = useRouter();
  const pathname = usePathname();

  if(isFetching) return <></>;

  const handleLogout = () => {
    const supabase = supabaseBrowser();
    queryClient.clear()
    supabase.auth.signOut()
    router.refresh()

    if(protectedPaths.includes(pathname)){
      router.replace("auth?next="+pathname)
    }
  }

  return (
      <div >
        {!data?.id ?(
        <Link href="/auth">
          <Button variant="outline">Sign In</Button>
        </Link>) :
            (
                <>
                  {data?.image_url ?
                      <Image
                          src={data.image_url || ""}
                          alt={data.display_name || ""}
                          width={50} height={50}
                          className="rounded-full animate-fade cursor-pointer"  onClick={handleLogout}/>
                      :
                      <div className="flex items-center justify-center
                                      rounded-full h-12.5 w-12.5
                                      ring-2 text-2xl text-bold
                                      cursor-pointer"
                      onClick={handleLogout}>
                        <h1>{data.email[0]}</h1>
                      </div>

                  }

                </>
            )}
      </div>
  )
}