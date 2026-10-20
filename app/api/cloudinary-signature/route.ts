import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app/api/cloudinary-signature/route.ts

// Signs an upload to the case-studies folder: for the case study form in /admin only.
export async function POST(req: NextRequest) {
  try {
    verifyAdmin(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const timestamp = body.timestamp;

    if (!timestamp) {
      return NextResponse.json(
        { error: "Missing timestamp" },
        { status: 400 }
      );
    }

    const paramsToSign = {
      timestamp,
      folder: "case-studies",
      source: "uw", // Add this line! 'uw' stands for Upload Widget
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "case-studies",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}