import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: { members: { some: { profileId: profile.id } } },
  });

  return (
    <div className="space-y-4 justify-between flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-4">
      <div className="flex flex-col items-center">
        <NavigationAction />
        <Separator className="bg-gray-700 w-10 my-3 flex items-center justify-between" />
        <div className="flex flex-col gap-3">
          {servers &&
            servers.map((item, index) => {
              return (
                <NavigationItem
                  key={index}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                />
              );
            })}
        </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-3">
        <ModeToggle />
        <UserButton
          appearance={{ elements: { avatarBox: "h-[45px] w-[45px]" } }}
          afterSignOutUrl="/"
        />
      </div>
    </div>
  );
}
