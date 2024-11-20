import Register from "../../../models/register.js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Register.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username " });
    }

    //  const isPasswordValid = await bcrypt.compare(password, user.password);
    //  if (!isPasswordValid) {
    //    return res.status(401).json({ message: "Invalid password" });
    //  }

    const accessToken = jwt.sign(
      { username: user.username, id: user._id },
      process.env.DIY_JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
