import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();
    if (!profile) {
      return new NextResponse("Unauthoried", { status: 401 });
    }
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        chalnels: {
          create: {
            name: "general",
            profileId: profile.id,
          },
        },
        members: { create: { profileId: profile.id, role: MemberRole.ADMIN } },
      },
    });
    console.log(server);
    return NextResponse.json(server);
  } catch (err) {
    console.log(err);
    return new NextResponse(`${err}`, { status: 500 });
  }
}
