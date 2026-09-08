CREATE TABLE "url" (
	"id" uuid PRIMARY KEY,
	"originalUrl" varchar(255) NOT NULL,
	"shortCode" varchar(255) NOT NULL,
	"createdAt" time
);
