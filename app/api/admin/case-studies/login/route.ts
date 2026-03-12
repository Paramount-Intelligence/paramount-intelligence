import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch("http://localhost:3001/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) return NextResponse.json({ error: data.error }, { status: res.status });

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set({
      name: "adminToken",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, 
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Backend unreachable" }, { status: 500 });
  }
}