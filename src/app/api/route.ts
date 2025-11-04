import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    return NextResponse.json({
      user_id: user.id,
      full_name: user.fullName || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
    });
  } catch (error) {
    console.error("Error in getUserID route:", error);
    return NextResponse.json({ error: "Failed to get user ID" }, { status: 500 });
  }
}
