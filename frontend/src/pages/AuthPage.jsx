import { useClerk } from "@clerk/react"
import { Button } from "@heroui/react"

function AuthPage() {
  const { openSignIn } = useClerk();

  const handleClerk = () => {
    openSignIn({ fallbackRedirectUrl: "/", forceRedirectUrl: "/" })
  }

  return (
    <div>
      <div>IChat your messaging web app</div>

      <Button className="bg-purple-500 hover:bg-purple-600" onClick={handleClerk}>Continue</Button>
    </div>
  )
}

export default AuthPage