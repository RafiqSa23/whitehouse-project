// middlewares/auth.middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // ✅ Ganti dengan jose

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  console.log("🔐 AUTH MIDDLEWARE - Path:", req.nextUrl.pathname);
  console.log("🔐 AUTH MIDDLEWARE - Token exists:", !!token);

  if (!token) {
    console.log("❌ No auth_token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY as string);
    const { payload } = await jwtVerify(token, secret);

    console.log(
      "✅ Token valid for user:",
      payload.username,
      "role:",
      payload.role
    );

    // Protect Admin routes
    if (
      req.nextUrl.pathname.startsWith("/dashboard/users") ||
      req.nextUrl.pathname.startsWith("/dashboard/login-activity")
    ) {
      const userRole = (payload as { role: string }).role;
      if (userRole !== "admin") {
        console.log(
          "❌ Unauthorized access to admin route, redirecting to dashboard"
        );
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    console.log("✅ Access granted to:", req.nextUrl.pathname);
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Token invalid:", error);

    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("auth_token");

    return response;
  }
}
