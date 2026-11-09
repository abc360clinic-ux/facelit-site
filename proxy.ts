import { NextResponse, type NextRequest } from "next/server";
import pRedirects from "./content/p-redirects.json"; // WP ?p=ID -> slug

// Legacy WordPress short links: /?p=87 -> 301 /slug/ (query dropped). Unknown ids fall through to home.
export function proxy(req: NextRequest) {
  const dest = (pRedirects as Record<string, string>)[req.nextUrl.searchParams.get("p") ?? ""];
  return dest ? NextResponse.redirect(new URL(dest, req.url), 301) : NextResponse.next();
}

export const config = { matcher: "/" };
