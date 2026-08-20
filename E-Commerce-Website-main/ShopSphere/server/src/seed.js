import "dotenv/config";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import { seedProducts } from "./data/products.js";
import { Cart } from "./models/Cart.js";
import { Order } from "./models/Order.js";
import { Product } from "./models/Product.js";
import { User } from "./models/User.js";

async function seed() {
  await connectDatabase(process.env.MONGODB_URI);
  await Promise.all([Product.deleteMany({}), Cart.deleteMany({}), Order.deleteMany({})]);
  await Product.insertMany(seedProducts);

  const email = (process.env.ADMIN_EMAIL || "admin@shopsphere.dev").toLowerCase();
  let admin = await User.findOne({ email });
  if (admin) {
    admin.name = process.env.ADMIN_NAME || "ShopSphere Admin";
    admin.password = process.env.ADMIN_PASSWORD || "Admin@12345";
    admin.role = "admin";
    await admin.save();
  } else {
    admin = await User.create({
      name: process.env.ADMIN_NAME || "ShopSphere Admin",
      email,
      password: process.env.ADMIN_PASSWORD || "Admin@12345",
      role: "admin",
    });
  }

  console.log(`Seed complete: ${seedProducts.length} products and admin ${email}`);
  await disconnectDatabase();
}

seed().catch(async (error) => {
  console.error(`Seed failed: ${error.message}`);
  await disconnectDatabase().catch(() => {});
  process.exit(1);
});
