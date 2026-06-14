export async function checkAuth(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in checkAuth Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
