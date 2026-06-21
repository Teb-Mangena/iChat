import { Show, SignInButton } from "@clerk/react"

function AuthPage() {
  return (
    <div>
      <div>AuthPage</div>

      <Show when="signed-out">
        <SignInButton mode='modal' />
      </Show>
    </div>
  )
}

export default AuthPage