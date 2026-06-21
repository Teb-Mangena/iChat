import { Show, UserButton } from '@clerk/react'
import LogOut from '../components/LogOut'

function HomePage() {

  return (
    <>
      <div>HomePage</div>
      <header>

        <Show when="signed-in">
          <UserButton />
        </Show>

        <LogOut />
      </header>
    </>
  )
}

export default HomePage