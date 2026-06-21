import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5050/api" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });

      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });

      get().connectSocket(res.data);

      toast.success("Auth check completed: Success");
    } catch (error) {
      console.log("Error in checkAuth", error);
      toast.error("Auth check completed: Failed");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  clearAuth: () => {
    set({
      authUser: null,
      isCheckingAuth: false,
      onlineUsers: [],
    });
    get().disconnectSocket();
  },

  connectSocket: async (user) => {
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: user._id },
    });

    set({ socket });

    socket.on("getOnlineUsers", (onlineUsers) => {
      set({ onlineUsers });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket?.disconnect();
    set({ socket: null });
  },
}));
