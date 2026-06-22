import { hasImageKitConfig, uploadChatMedia } from "../lib/imagekit.js";
import { redis } from "../lib/redis.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export async function getUserContacts(req, res) {
  try {
    const loggedInUser = req.user._id;
    let cachedUsers = await redis.get("contact_users");

    if (cachedUsers) {
      return res.status(200).json(JSON.parse(cachedUsers));
    }

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-clerkId");

    cachedUsers = await redis.set(
      "contact_users",
      JSON.stringify(filteredUsers),
      "EX",
      3600,
    );

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUerContacts");
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMessages(req, res) {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages");
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendMessage(req, res) {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const text = req.body.text;

    let videoUrl;
    let imageUrl;

    if (req.file) {
      if (!hasImageKitConfig()) {
        return res
          .status(500)
          .json({ message: "Media upload is not configured" });
      }

      const url = await uploadChatMedia(req.file);

      if (req.file.mimetype.startsWith("video/")) videoUrl = url;
      else imageUrl = url;
    }

    const newMessage = new Message({
      receiverId,
      senderId,
      text,
      image: imageUrl,
      video: videoUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    // only send the message in realtime if user is online
    if (receiverSocketId) {
      io.to(receiverId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage");
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getConversationsForSidebar(req, res) {
  try {
    const loggedInUserId = req.user._id;

    const conversations = await Message.aggregate([
      // 1. Keep only the messages I sent or received.
      {
        $match: {
          $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
        },
      },
      // 2. Collapse them into one row per chat partner, noting our latest message time.
      {
        $group: {
          // The partner is the other person on the message (not me).
          _id: {
            $cond: [
              { $eq: ["$senderId", loggedInUserId] },
              "$receiverId",
              "$senderId",
            ],
          },
          lastMessageAt: { $max: "$createdAt" },
        },
      },
      // 3. Put the most recent conversation at the top.
      { $sort: { lastMessageAt: -1 } },
      // 4. Look up each partner's user profile (comes back as an array).
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      // 5. Pull that profile out of the array and make it the document.
      { $replaceRoot: { newRoot: { $first: "$user" } } },
      // 6. Hide the private clerkId field from the result.
      { $project: { clerkId: 0 } },
    ]);

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error in getConversationsForSidebar:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
