ALTER TABLE "url" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "url" ALTER COLUMN "createdAt" SET DATA TYPE timestamp USING "createdAt"::timestamp;--> statement-breakpoint
ALTER TABLE "url" ALTER COLUMN "createdAt" SET DEFAULT now();