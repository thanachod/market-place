CREATE TABLE "companies" (
  "id" integer PRIMARY KEY,
  "name" string,
  "address" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "store" (
  "id" integer PRIMARY KEY,
  "name" string,
  "address" text,
  "company_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "password" string,
  "email" string,
  "role" varchar,
  "score" number,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "products" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "body" text,
  "quantity" number,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "stocks" (
  "id" integer PRIMARY KEY,
  "product_id" integer,
  "store_id" integer,
  "quantity" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "wishlists" (
  "id" integer PRIMARY KEY,
  "product_id" integer,
  "user_id" integer
);

CREATE TABLE "orders" (
  "id" integer PRIMARY KEY,
  "product_id" integer,
  "user_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "payment_status" timestamp,
  "quantity" integer
);

CREATE TABLE "sales" (
  "id" integer PRIMARY KEY,
  "event" integer,
  "product_id" integer,
  "discount" float
);

CREATE TABLE "events" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "descriptions" text,
  "started_date" timestamp,
  "ended_date" timestamp
);

COMMENT ON COLUMN "products"."body" IS 'Content of the post';

ALTER TABLE "companies" ADD CONSTRAINT "companies" FOREIGN KEY ("id") REFERENCES "store" ("company_id");

ALTER TABLE "users" ADD CONSTRAINT "users" FOREIGN KEY ("id") REFERENCES "wishlists" ("user_id");

ALTER TABLE "users" ADD CONSTRAINT "users" FOREIGN KEY ("id") REFERENCES "orders" ("user_id");

ALTER TABLE "events" ADD CONSTRAINT "events" FOREIGN KEY ("id") REFERENCES "sales" ("event");

ALTER TABLE "sales" ADD CONSTRAINT "sales" FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "products" ADD CONSTRAINT "stocks" FOREIGN KEY ("id") REFERENCES "stocks" ("product_id");

ALTER TABLE "stocks" ADD CONSTRAINT "stocks" FOREIGN KEY ("store_id") REFERENCES "store" ("id");
