// TODO: Task 3.1 - Design database schema for users, projects, lists, and tasks
// TODO: Task 3.3 - Set up Drizzle ORM with type-safe schema definitions

/*
TODO: Implementation Notes for Interns:

1. Install Drizzle ORM dependencies:
   - drizzle-orm
   - drizzle-kit
   - @vercel/postgres (if using Vercel Postgres)
   - OR pg + @types/pg (if using regular PostgreSQL)

2. Define schemas for:
   - users (id, clerkId, email, name, createdAt, updatedAt)
   - projects (id, name, description, ownerId, createdAt, updatedAt, dueDate)
   - lists (id, name, projectId, position, createdAt, updatedAt)
   - tasks (id, title, description, listId, assigneeId, priority, dueDate, position, createdAt, updatedAt)
   - comments (id, content, taskId, authorId, createdAt, updatedAt)

3. Set up proper relationships between tables
4. Add indexes for performance
5. Configure migrations

Example structure:
import { pgTable, text, timestamp, integer, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// ... other tables
*/

// Placeholder exports to prevent import errors
/* 
export const users = "TODO: Implement users table schema"
export const projects = "TODO: Implement projects table schema"
export const lists = "TODO: Implement lists table schema"
export const tasks = "TODO: Implement tasks table schema"
export const comments = "TODO: Implement comments table schema" 
*/


import { pgTable, text, timestamp, varchar, integer, uuid, primaryKey, uniqueIndex, index, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

export const roleEnum = pgEnum('role', ['user', 'project_manager', 'admin']);
export const taskStatusEnum = pgEnum('task_status', ['todo', 'in_progress', 'review', 'done', 'backlog']);
export const priorityEnum = pgEnum("task_priority", ["low", "medium", "high", "urgent"]);

export const organizations = pgTable('organizations', {
   id: uuid('id').defaultRandom().primaryKey(),
   orgName: text('org_name').notNull(),
   clerkOrgId: text('clerk_org_id').notNull().unique(),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at').defaultNow(),
});

export const users = pgTable('users', {
   id: uuid('id').defaultRandom().primaryKey(),
   clerkId: text('clerk_id').notNull().unique(),
   email: text('email').notNull(),
   firstName: text('first_name'),
   lastName: text('last_name'),
   imageUrl: text('image_url'),
   role: roleEnum('role').notNull().default('user'),
   orgId: uuid('org_id').references(() => organizations.id, { onDelete: "cascade" }).notNull(),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
   clerkIdx: (index('clerk_id_idx').on(table.clerkId)),
}));

export const projects = pgTable('projects', {
   id: uuid('id').defaultRandom().primaryKey(),
   projectName: text('project_name').notNull(),
   description: text('description'),
   ownerId: uuid('owner_id').references(() => users.id, { onDelete: "cascade" }).notNull(),
   dueDate: timestamp('due_date'),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at').defaultNow(),
});

export const lists = pgTable('lists', {
   id: uuid('id').defaultRandom().primaryKey(),
   name: text('name').notNull(),
   projectId: uuid('project_id').references(() => projects.id, { onDelete: "cascade" }).notNull(),
   position: integer('position').notNull().default(0),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at').defaultNow(),
});

export const categories = pgTable('categories', {
   id: uuid('id').defaultRandom().primaryKey(),
   name: text('name').notNull(),
   color: text('color').default('#7c3aed'),
   projectId: uuid('project_id').references(() => projects.id, { onDelete: "cascade" }),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
   id: uuid('id').defaultRandom().primaryKey(),
   title: text('title').notNull(),
   description: text('description'),
   listId: uuid('list_id').references(() => lists.id, { onDelete: "cascade" }),
   assigneeId: uuid('assignee_id').references(() => users.id, { onDelete: "set null" }),
   status: taskStatusEnum('task_status').notNull().default('todo'),
   priority: priorityEnum("task_priority").notNull().default("medium"),
   dueDate: timestamp('due_date'),
   position: integer('position').notNull().default(0),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at').defaultNow(),
});

export const taskCategories = pgTable('task_categories', {
   taskId: uuid('task_id').references(() => tasks.id, { onDelete: "cascade" }).notNull(),
   categoryId: uuid('category_id').references(() => categories.id, { onDelete: "cascade" }).notNull(),
}, (t) => ({
   pk: primaryKey({ columns: [t.taskId, t.categoryId] }),
}));

export const comments = pgTable('comments', {
   id: uuid('id').defaultRandom().primaryKey(),
   content: text('content').notNull(),
   taskId: uuid('task_id').references(() => tasks.id, { onDelete: "cascade" }).notNull(),
   authorId: uuid('author_id').references(() => users.id, { onDelete: "set null" }).notNull(),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at').defaultNow(),
});

// Define relations
export const userRelations = relations(users, ({ one, many }) => ({
   organizations: one(organizations, { fields: [users.orgId], references: [organizations.id] }),
   projects: many(projects),
   tasks: many(tasks),
   comments: many(comments),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
   owner: one(users, {fields: [projects.ownerId], references: [users.id] }),
   lists: many(lists),
}));

export const listRelations = relations(lists, ({ one, many }) => ({
   project: one(projects, {fields: [lists.projectId], references: [projects.id] }),
   tasks: many(tasks),
}));

export const categoryRelations = relations(categories, ({ one, many }) => ({
   taskCategories: many(taskCategories),
}));

export const taskRelations = relations(tasks, ({ one, many }) => ({
   list: one(lists, { fields: [tasks.listId], references: [lists.id]}),
   assignee: one(users, { fields: [tasks.assigneeId], references: [users.id] }),
   taskCategories: many(taskCategories),
   comments: many(comments),
}));

export const taskCategoriesRelations = relations(taskCategories, ({ one }) => ({
   task: one(tasks, { fields: [taskCategories.taskId], references: [tasks.id] }),
   category: one(categories, { fields: [taskCategories.categoryId], references: [categories.id] }),
}));

export const commentRelations = relations(comments, ({ one }) => ({
   task: one(tasks, { fields: [comments.taskId], references: [tasks.id] }),
   author: one(users, { fields: [comments.authorId], references: [users.id] }),
}));
