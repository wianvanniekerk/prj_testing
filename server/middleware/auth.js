import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function isAuthenticated(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.DIY_JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.user = { id: decoded.id,
      username: decoded.username
    };
    console.log(decoded);
    next();
  });
}

export default isAuthenticated;
