import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    
    // Clear the cookie
    response.cookies.set({
      name: "adminToken",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // expires immediately
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}