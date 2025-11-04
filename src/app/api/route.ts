import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const API_KEY = process.env.VAPI_INTERNAL_KEY; // Add this in your .env

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${API_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user_id: user.id,
      full_name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

