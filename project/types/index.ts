// TypeScript type definitions
// Task 1.3: Set up project structure and folder organization

import { InferSelectModel } from "drizzle-orm";
import * as schema from "@/lib/db/schema";

export type Organization = InferSelectModel<typeof schema.organizations>;
export type Category = InferSelectModel<typeof schema.categories>;

export interface User extends Omit<InferSelectModel<typeof schema.users>, 'firstName' | 'lastName'> {
  firstName: string;
  lastName: string | null;
  name: string;
  projects?: Project[];
  tasks?: Task[];
}

export interface Project extends InferSelectModel<typeof schema.projects> {
  lists?: List[];
  owner?: User;
}

export interface List extends InferSelectModel<typeof schema.lists> {
  tasks?: Task[];
}

export interface Task extends InferSelectModel<typeof schema.tasks> {
  comments?: Comment[];
  categories?: Category[];
  assignee?: User | null;
}

export interface Comment extends InferSelectModel<typeof schema.comments> {
  author?: User;
}

export type TaskStatus = "todo" | "in_progress" | "review" | "done" | "backlog";
export type Priority = "low" | "medium" | "high" | "urgent";
export type ProjectStatus = "active" | "completed" | "on-hold";
export type UserRole = "member" | "project_manager" | "admin";


// Note for interns: These types should match your database schema
// Update as needed when implementing the actual database schema
