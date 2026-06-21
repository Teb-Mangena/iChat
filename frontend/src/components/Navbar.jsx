import { Show, UserButton } from "@clerk/react";
import LogOut from "./LogOut";
import { Button } from "@heroui/react";
import { MessageCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-divider/40 bg-background/70 backdrop-blur-xl backdrop-saturate-150 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Button
          as="a"
          href="/"
          variant="light"
          startContent={<MessageCircle className="h-5 w-5 text-primary" />}
          className="px-0 text-xl font-bold data-[hover=true]:bg-transparent"
        >
          IChat
        </Button>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Show when="signed-in">
            <UserButton afterSignOutUrl="/" />
            <LogOut />
          </Show>
          <Show when="signed-out">
            <Button
              as="a"
              href="/sign-in"
              color="primary"
              variant="flat"
            >
              Sign Ins
            </Button>
          </Show>
        </div>
      </div>
    </header>
  );
}