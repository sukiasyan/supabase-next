"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import useUser from "@/app/app/useUser";
import Image from "next/image";

export default function Profile() {
  const {isFetching, data} = useUser();

  if(isFetching) return <></>;

  return (
      <div >
        {!data?.id ?
        <Link href="/auth">
          <Button variant="outline">Sign In</Button>
        </Link> :
            <Image src={data.image_url || ""} alt={data.display_name || ""} width={50} height={50}  className="rounded-full animate-fade"/>}
      </div>
  )
}