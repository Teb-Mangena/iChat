import { useAuth } from '@clerk/react';
import { LogOut as LogOutIcon } from "lucide-react"

function LogOut() {
  const { signOut } = useAuth()

  const handleSignOut = () => {
    const confirmed = window.confirm("Are you sure you want to log out?")

    if (confirmed) signOut();
  }

  return (
    <button onClick={handleSignOut} className='border border-red-500 rounded-2xl p-3 px-5 flex gap-2 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
      <LogOutIcon />
      <p>Log out</p>
    </button>
  )
}

export default LogOut