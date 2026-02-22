"use client";

import { Button } from "@/components/ui/button";
import useUser from "@/app/useUser";
import { useRouter } from "next/navigation";
import { checkout } from "@/lib/actions/stripe";
import {useState} from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {cn} from "@/lib/utils";

export default function Checkout({ priceId }: { priceId: string }) {
  const { data: user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (user?.id) {
      // 1. Call your server action
      setLoading(true)
      const data = JSON.parse(await checkout(user.email, priceId, location.origin + "/success"));


      if (data.url) {
        // 2. Redirect directly to the Stripe-hosted URL

      location.assign(data.url);
      } else {
        console.error("Failed to create checkout session");
      }

    } else {
      setLoading(false)
      router.push("/auth?next=" + location.pathname);
    }
  };

  return (
      <Button className="w-full flex items-center gap-2" onClick={handleCheckout}>
        Buy Now <AiOutlineLoading3Quarters className={cn("animate-spin", loading ? "block" : "hidden")}/>
      </Button>
  );
}