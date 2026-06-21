
import { Button } from "@heroui/react";
import { LogOut } from "lucide-react";
import { useClerk } from "@clerk/react";

export default function LogOutButton() {
  const { signOut } = useClerk();
  return (
    <Button
      isIconOnly
      variant="light"
      color="danger"
      onPress={() => signOut()}
      aria-label="Log out"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
}