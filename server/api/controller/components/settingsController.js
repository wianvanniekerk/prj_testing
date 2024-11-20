import Register from "../../../models/register.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  const { firstName, lastName, emailAddress, username, password } = req.body;
  const userId = req.user.id;

  try {
    const updatedUser = await Register.findByIdAndUpdate(
      userId,
      { firstName, lastName, emailAddress, username, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user." });
  }
};

export const updateUserPassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await Register.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({ message: "Error updating password." });
  }
};

export const getUser = async (req, res) => {
  try {
    const username = req.user.username;
    const user = await Register.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user." });
  }
};
