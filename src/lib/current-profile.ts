import { db } from "./db";
import { auth } from "@clerk/nextjs";

export async function currentProfile() {
  const { userId } = auth();
  console.log(userId);
  if (!userId) {
    return null;
  }

  return await db.profile.findUnique({ where: { userId: userId } });
}
