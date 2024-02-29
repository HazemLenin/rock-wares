import "dotenv/config";
import { db } from ".";
import { migrate } from "drizzle-orm/neon-serverless/migrator";

migrate(db, { migrationsFolder: "./drizzle" });
