import express from "express";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();

async function loadRoutes(folder) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const folderPath = path.join(__dirname, folder);
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    if (file.endsWith(".js")) {
      const route = await import(path.join(folderPath, file));
      router.use(route.default);
    }
  }
}

(async () => {
  await loadRoutes("auth");
  await loadRoutes("components");
})();

export default router;
