import { useState } from "react";
import { useClerk } from "@clerk/react";
import { Button, Modal } from "@heroui/react";
import { LogOut, AlertTriangle } from "lucide-react";

export default function LogOutButton() {
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        color="danger"
        onPress={() => setIsOpen(true)}
        aria-label="Log out"
      >
        <LogOut className="h-5 w-5" />
      </Button>

      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-danger-soft text-danger">
                <AlertTriangle className="h-5 w-5" />
              </Modal.Icon>
              <Modal.Heading>Confirm Logout</Modal.Heading>
              <p className="text-sm text-muted">
                Are you sure you want to log out? You’ll need to sign in again to access your chats.
              </p>
            </Modal.Header>
            <Modal.Body>
              <p>You will be redirected to the sign‑in page.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close" color="danger" onPress={() => signOut()}>
                Log Out
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}