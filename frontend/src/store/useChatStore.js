import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
  users: [],
  isContactsLoading: false,

  getContactUsers: async () => {
    try {
      set({ isContactsLoading: false });

      const res = await axiosInstance.get("/messages/contacts");

      set({ users: res.data });
    } catch (error) {
      console.log("Error loading contacts", error);
      set({ users: [] });
    } finally {
      set({ isContactsLoading: false });
    }
  },
}));
