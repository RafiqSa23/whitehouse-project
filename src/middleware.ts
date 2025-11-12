import { NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/auth.middleware";

export function middleware(req: NextRequest) {
  console.log("🔐 Middleware triggered for:", req.nextUrl.pathname);
  return authMiddleware(req);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
