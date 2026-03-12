ALTER TABLE "projects" ADD COLUMN "org_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "progress" integer DEFAULT 0;