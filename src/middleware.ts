import { NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/auth.middleware";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("🔐 Middleware triggered for:", req.nextUrl.pathname);
  return authMiddleware(req);

  const url = req.nextUrl.pathname;

  // Blokir access ke flight / RSC payload
  if (url.startsWith("/_next/data") || url.includes("__rsc")) {
    return NextResponse.redirect("/");
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
