import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "../api/routes/index.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(
  cors({
    origin: "https://prjtesting-production.up.railway.app",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api", router);

export default app;
