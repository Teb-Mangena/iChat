import Navbar from '../components/Navbar';
import UserContacts from '../components/chat/UserContacts';

function HomePage() {
  return (
    <div>
      <Navbar />

      <div>
        <UserContacts />
      </div>
    </div>
  )
}

export default HomePage