import { AccessToken } from "livekit-server-sdk";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export async function GET() {
  try {
    const livekitUrl = requireEnv("LIVEKIT_URL");
    const livekitApiKey = requireEnv("LIVEKIT_API_KEY");
    const livekitApiSecret = requireEnv("LIVEKIT_API_SECRET");

    const roomName = `support-room-${randomUUID()}`;
    const identity = `support-user-${randomUUID()}`;

    const token = new AccessToken(livekitApiKey, livekitApiSecret, {
      identity,
      name: "Support User",
    });

    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const jwt = await token.toJwt();

    return NextResponse.json({
      token: jwt,
      serverUrl: livekitUrl,
      roomName,
      identity,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate LiveKit token";

    console.error("LiveKit token route failed:", message);

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}