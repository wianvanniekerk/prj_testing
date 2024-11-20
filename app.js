import connectDB from "./server/config/db.js";
import seedDatabase from "./server/js/seed.js";
import app from "./server/config/express.js";
import dotenv from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
// import { Server } from "socket.io";
// import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const PORT = process.env.PORT || 8000;

// const server = http.createServer(app);
// const io = new Server(server);

// io.on("connection", (socket) => {
//   console.log("ESP32 connected");

//   socket.on("sensorData", (data) => {
//     console.log("Received sensor data:", data);
//     io.emit("sensorData", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("ESP32 disconnected");
//   });
// });

connectDB()
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`App is running on ${PORT}`);
      await seedDatabase();
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
