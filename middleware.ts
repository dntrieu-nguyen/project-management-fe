import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// authentication middleware
const authMiddleware = (request: NextRequest) => {
  const user = request.cookies.get("user");
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
};

// middleware check login
const checkLoginMiddleware = (request: NextRequest) => {
  const user = request.cookies.get("user");
  if (user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

// middleware check admin role
const checkAdminRole = (request: NextRequest) => {
  const user = request.cookies.get("user");
  if (user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

// combine middleware
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const authRoutes = ["/", "/projects", "/projects/:id*", "/user/:id*", "/password", "/profile", "/dashboard"];
  if (authRoutes.some((route) => matchPath(pathname, route))) {
    return authMiddleware(request);
  }

  const publicRoutes = ["/login", "/register"];
  if (publicRoutes.some((route) => matchPath(pathname, route))) {
    return checkLoginMiddleware(request);
  }

  return NextResponse.next();
}

function matchPath(pathname: string, route: string): boolean {
  const regex = new RegExp("^" + route.replace(/:[^/]+/g, "[^/]+").replace(/\*/g, ".*") + "$");
  return regex.test(pathname);
}

export const config = {
  matcher: [
    "/",
    "/projects",
    "/projects/:id*",
    "/user/:id*",
    "/password",
    "/profile",
    "/login",
    "/register",
    "/dashboard",
  ],
};
