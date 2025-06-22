CREATE TYPE "role_list" AS ENUM (
  'customers',
  'admins'
);

CREATE TABLE "items" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "body" text,
  "quantity" number,
  "image_path" varchar,
  "categories" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "categories" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "parent_id" integer,
  "description" text
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar(50),
  "password" string,
  "email" string,
  "role" role_list,
  "score" number,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "wishlists" (
  "id" integer PRIMARY KEY,
  "item_id" integer,
  "user_id" integer
);

CREATE TABLE "orders" (
  "id" integer PRIMARY KEY,
  "item_id" integer,
  "user_id" integer,
  "quantity" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "sales" (
  "id" integer PRIMARY KEY,
  "item_id" integer,
  "discount" float,
  "start_date" datetime,
  "end_date" datetime,
  "created_at" timestamp,
  "updated_at" timestamp
);

COMMENT ON COLUMN "items"."body" IS 'descriptions';

ALTER TABLE "items" ADD FOREIGN KEY ("categories") REFERENCES "categories" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("parent_id") REFERENCES "categories" ("id");

ALTER TABLE "wishlists" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "sales" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");

ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists" FOREIGN KEY ("item_id") REFERENCES "items" ("id");
