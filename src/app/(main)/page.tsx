import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
      <p>caonam</p>
      <Button>Click</Button>
    </main>
  );
}
