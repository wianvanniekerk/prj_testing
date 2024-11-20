import Register from "../../../models/register.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { firstName, lastName, emailAddress, username, password, userId } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Register({
      firstName,
      lastName,
      emailAddress,
      username,
      password: hashedPassword,
      userId,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving user." });
  }
};
