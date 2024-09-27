import { NextResponse } from "next/server";

export function middleware(request) {
  // Only run this middleware for /classroom routes
  if (!request.nextUrl.pathname.startsWith("/classroom")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token");
  const userDataCookie = request.cookies.get("userData");

  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null;

  if (request.nextUrl.pathname === "/classroom/signin") {
    if (token) {
      return NextResponse.redirect(new URL("/classroom", request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/classroom/signin", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/classroom/teacher")) {
    if (userData && userData.type !== "teacher") {
      return NextResponse.redirect(new URL("/classroom/student", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/classroom/student")) {
    if (userData && userData.type !== "student") {
      return NextResponse.redirect(new URL("/classroom/teacher", request.url));
    }
  }

  /**
   * Dont delete, this will enable soon to redirect users to the teacher or student page based on their user type while access /classroom
   */

  /** 
  if (request.nextUrl.pathname === "/classroom") {
    if (userData && userData.type === "teacher") {
      return NextResponse.redirect(new URL("/classroom/teacher", request.url));
    } else if (userData && userData.type === "student") {
      return NextResponse.redirect(new URL("/classroom/student", request.url));
    }
  }
    */

  return NextResponse.next();
}

export const config = {
  matcher: ["/classroom", "/classroom/:path*"],
};
