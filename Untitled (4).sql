DROP database dbteachers_students
--DROP SCHEMA public CASCADE
--CREATE SCHEMA public

CREATE TABLE "teachers" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text NOT NULL,
  "name" text NOT NULL,
  "dob" timestamp NOT NULL,
  "degree" text NOT NULL,
  "delivery" text NOT NULL,
  "subjects" text NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "students" (
  "id" SERIAL PRIMARY KEY,
  "teacher_id" int NOT NULL,
  "avatar_url" text NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "dob" timestamp NOT NULL,
  "grade" text NOT NULL,
  "hours_classes" int NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "students" ADD FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id");
