import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/useAuthStore'

function HomePage() {
  const { onlineUsers } = useAuthStore();

  console.log(onlineUsers)

  return (
    <div>
      <Navbar />
      <div>HomePage</div>
    </div>
  )
}

export default HomePage