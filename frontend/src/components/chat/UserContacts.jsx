import { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Search,
  UserPlus,
  MessageCircle,
  MoreVertical,
  LoaderCircle,
  Mail,
  Circle,
} from "lucide-react";

function UserContacts() {
  const { users, getContactUsers, isContactsLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    getContactUsers();
  }, [getContactUsers]);

  // Filter contacts by name
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check online status
  const isUserOnline = (userId) => onlineUsers.includes(userId);

  // Toggle dropdown menu
  const toggleMenu = (userId) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (isContactsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-500">
        <LoaderCircle className="animate-spin text-blue-500" size={36} />
        <span className="mt-2 text-sm">Loading contacts…</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white p-4 max-w-md mx-auto">
      {/* Header with search and add button */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search contacts…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm bg-gray-50 transition"
          />
        </div>
        <button
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm"
          aria-label="Add contact"
        >
          <UserPlus size={20} />
        </button>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            {searchQuery ? (
              <>
                <Search size={32} className="mx-auto mb-2 opacity-50" />
                <p>No results for “{searchQuery}”</p>
              </>
            ) : (
              <>
                <UserPlus size={32} className="mx-auto mb-2 opacity-50" />
                <p>No contacts yet. Add your first!</p>
              </>
            )}
          </div>
        ) : (
          filteredUsers.map((user) => {
            const online = isUserOnline(user._id);
            return (
              <div
                key={user._id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition group"
              >
                {/* Avatar with online dot */}
                <div className="relative shrink">
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <Circle
                    size={14}
                    className={`absolute bottom-0 right-0 ${online ? "fill-green-500 text-green-500" : "fill-gray-300 text-gray-300"
                      } border-2 border-white rounded-full`}
                  />
                </div>

                {/* User info */}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-800 truncate">
                    {user.fullName}
                  </p>
                  <p className="text-sm text-gray-400 truncate flex items-center gap-1">
                    <Mail size={14} />
                    {user.email}
                  </p>
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-1.5 rounded-full hover:bg-blue-100 text-blue-500 transition"
                    aria-label="Send message"
                    onClick={() => console.log("Message", user._id)}
                  >
                    <MessageCircle size={18} />
                  </button>
                  <div className="relative">
                    <button
                      className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition"
                      aria-label="More actions"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(user._id);
                      }}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openMenuId === user._id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                        <button
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
                          onClick={() => {
                            console.log("View profile", user._id);
                            setOpenMenuId(null);
                          }}
                        >
                          View profile
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
                          onClick={() => {
                            console.log("Send message", user._id);
                            setOpenMenuId(null);
                          }}
                        >
                          Send message
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                          onClick={() => {
                            console.log("Remove contact", user._id);
                            setOpenMenuId(null);
                          }}
                        >
                          Remove contact
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UserContacts;