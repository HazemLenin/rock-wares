import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
	boolean,
	doublePrecision,
	foreignKey,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Create a pgTable that maps to a table in your DB
export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	firstName: text("firstName").notNull(),
	lastName: text("lastName").notNull(),
	email: text("email").notNull().unique(),
	passwordHash: text("passwordHash").notNull(),
	isAdmin: boolean("isAdmin").default(false),
});

export const usersRelations = relations(users, ({ many }) => ({
	orders: many(orders),
}));

export const products = pgTable("products", {
	id: serial("id").primaryKey(),
	image: text("image"),
	description: text("description"),
	price: doublePrecision("price").notNull(),
	categoryId: integer("categoryId")
		.references(() => categories.id, {
			onDelete: "cascade",
		})
		.notNull(),
	bandId: integer("bandId")
		.references(() => bands.id, {
			onDelete: "cascade",
		})
		.notNull(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id],
	}),
	band: one(bands, {
		fields: [products.bandId],
		references: [bands.id],
	}),
	orderItems: many(orderItems),
}));

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products),
}));

export const bands = pgTable("bands", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	image: text("image").notNull(),
});

export const bandsRelations = relations(bands, ({ many }) => ({
	products: many(products),
}));

export const orders = pgTable("orders", {
	id: serial("id").primaryKey(),
	userId: integer("userId")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	isPurchased: boolean("isPurchased").default(false),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.id],
	}),
	orderItems: many(orderItems),
}));

export const orderItems = pgTable("orderItems", {
	id: serial("id").primaryKey(),
	productId: integer("productId")
		.references(() => products.id)
		.notNull(),
	quantity: integer("quantity").notNull(),
	orderId: integer("orderId")
		.references(() => orders.id)
		.notNull(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	product: one(products, {
		fields: [orderItems.productId],
		references: [products.id],
	}),
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id],
	}),
}));
