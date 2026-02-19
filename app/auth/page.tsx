"use client"

import {KeyRound} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {supabaseBrowser} from "@/lib/supabase/browser";

export default function Page() {
  const handleLoginWithOAuth = (provider: "github" | "google") => {
    const supabase =supabaseBrowser();
    supabase.auth.signInWithOAuth({ provider, options: {
      redirectTo: location.origin + "/auth/callback"
    }})
  }
  const isLocalEnv = process.env.NODE_ENV === 'development'
  console.log('Function: GET - Line 21 - ', isLocalEnv);
  return(
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-96 rounded border p-5 space-y-5">
        <div className="flex items-center gap-2">
        <KeyRound />
        <h1 className="text-2xl font-bold">Next + Supabase</h1>
          </div>
        <p className="text-sm text-gray-300">Register/SignIn today</p>
        <div className="flex flex-col gap-5">
          <Button className="w-full flex items-center gap-2" variant="outline" onClick={()=>handleLoginWithOAuth("github")}><FaGithub />Github</Button>
          <Button className="w-full flex items-center gap-2" variant="outline" onClick={()=>handleLoginWithOAuth("google")}><FcGoogle />Google</Button>
        </div>
      </div>
    </div>
  )
}