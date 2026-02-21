import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import {protectedPaths} from "@/lib/constant";


// 🔴 MUST be outside (Edge build-time injection)
const supabaseUrl =
    process.env['NEXT_PUBLIC_SUPABASE_URL'] as string;

const supabaseAnonKey =
    process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string;


console.log("SUPABASE URL =", supabaseUrl);
console.log("SUPABASE KEY =", !!supabaseAnonKey);



export async function proxy(request: NextRequest) {

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },

          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value,
              ...options,
            });

            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });

            response.cookies.set({
              name,
              value,
              ...options,
            });
          },

          remove(name: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value: "",
              ...options,
            });

            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });

            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
  );


  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  console.log('Function: proxy - Line 86 - ', pathname);

  // ✅ If logged in and tries to access /auth → redirect home
  if (session && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  // ❌ If NOT logged in and tries protected route → redirect to /auth
  if (!session && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(
        new URL(`/auth?next=${pathname}`, request.url)
    );
  }


  return response;
}


// 👇 MUST match everything except static files
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
