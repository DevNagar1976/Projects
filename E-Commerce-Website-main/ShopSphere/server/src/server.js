import "dotenv/config";
import { app } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";

const port = Number(process.env.PORT) || 5000;

async function start() {
  const jwtSecret = process.env.JWT_SECRET?.trim();
  if (!jwtSecret || jwtSecret.length < 32) {
    process.env.JWT_SECRET = `${jwtSecret || "shopsphere-dev-secret"}`.padEnd(32, "x");
    console.warn("JWT_SECRET was missing or too short; using a development fallback.");
  }

  await connectDatabase(process.env.MONGODB_URI);
  const server = app.listen(port, () => {
    console.log(`ShopSphere API running at http://localhost:${port}`);
  });

  async function shutdown(signal) {
    console.log(`${signal} received. Closing server...`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  }
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((error) => {
  console.error(`Server failed to start: ${error.message}`);
  process.exit(1);
});
