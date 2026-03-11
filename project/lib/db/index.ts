// TODO: Task 3.2 - Configure PostgreSQL database (Vercel Postgres or Neon)
// TODO: Task 3.5 - Implement database connection and query utilities

/*
TODO: Implementation Notes for Interns:

(Done) 1. Choose database provider:
   - Vercel Postgres (recommended for Vercel deployment)
   - Neon (good alternative)
   - Local PostgreSQL for development

(Done) 2. Set up environment variables:
   - DATABASE_URL
   - POSTGRES_URL (if using Vercel Postgres)

(Done) 3. Configure Drizzle connection

4. Implement CRUD operations for all entities
5. Add proper error handling
6. Set up connection pooling if needed

Example structure:
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from './schema'

export const db = drizzle(sql, { schema })

export const queries = {
  projects: {
    getAll: async () => { ... },
    getById: async (id: string) => { ... },
    create: async (data: any) => { ... },
    update: async (id: string, data: any) => { ... },
    delete: async (id: string) => { ... },
  },
  // ... other entity queries
}
*/

// Placeholder exports to prevent import errors
// (Done) TODO: Implement database connection

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, and, asc, desc, exists } from 'drizzle-orm';
import * as schema from './schema';
import { organizations, users, projects, tasks, lists, comments } from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env');
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });

export const queries = {
  organizations: {
    getById: async (id: string) => {
      return await db.query.organizations.findFirst({
        where: eq(organizations.id, id),
      });
    },
    getByClerkId: async (clerkOrgId: string) => {
      return await db.query.organizations.findFirst({
        where: eq(organizations.clerkOrgId, clerkOrgId),
      });
    },
    create: async (data: typeof organizations.$inferInsert) => {
      const [newOrg] = await db.insert(organizations).values(data).returning();
      return newOrg;
    },
  },

  users: {
    getByClerkId: async (clerkId: string) => {
      return await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
      });
    },
    create: async (data: typeof users.$inferInsert) => {
      const [newUser] = await db.insert(users).values(data).returning();
      return newUser;
    },
    update: async (clerkId: string, data: Partial<typeof users.$inferInsert>) => {
      const [updated] = await db.update(users)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(users.clerkId, clerkId))
        .returning();
      return updated;
    },
  },

  projects: {
    getByProject: async (projectId: string) => {
      try {
        return await db.query.tasks.findMany({
          where: (tasks, { exists, and, eq }) => 
            exists(
              db.select().from(lists).where(and(eq(lists.id, tasks.listId), eq(lists.projectId, projectId)))
            ),
          with: {
            assignee: true,
            list: true,
            comments: true,
            taskCategories: { with: { category: true } },
          },
          orderBy: [tasks.position],
        });
      } catch (error) {
        console.error(`Error fetching tasks for project ${projectId}:`, error);
        throw new Error('Failed to fetch tasks');
      }
    },

    getAll: async (orgId: string) => {
      try {
        const result = await db.query.projects.findMany({
          where: eq(projects.ownerId, orgId),
          orderBy: [desc(projects.createdAt)],
        });

        if(!result) {
          throw new Error('No projects found');
        }
        return result;
      } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Failed to fetch projects');
      }
    },

    getById: async (id: string) => {
      try {
        const result = await db.query.projects.findFirst({
          where: eq(schema.projects.id, id),
        });

        if(!result) {
          throw new Error('Project not found.');
        }
        return result;
      } catch (error) {
        console.error(`Error fetching project ${id}:`, error);
        throw new Error('Failed to fetch project');
      }
    },

    create: async (data: typeof projects.$inferInsert) => {
      try {
        const [newProject] = await db.insert(projects).values(data).returning();
        return newProject;
      } catch (error) {
        console.error('Error creating project:', error);
        throw new Error('Failed to create project');
      }
    },

    update: async (id: string, data: Partial<typeof projects.$inferInsert>) => {
      try {
        const [updatedProject] = await db.update(projects).set({ ...data, updatedAt: new Date() }).where(eq(projects.id, id)).returning();
        return updatedProject;
      } catch (error) {
        console.error(`Error updating project ${id}:`, error);
        throw new Error('Failed to update project');
      }
    },

    delete: async (id: string) => {
      try {
        const [deletedProject] = await db.delete(projects).where(eq(projects.id, id)).returning();
        return deletedProject;
      } catch (error) {
        console.error(`Error deleting project ${id}:`, error);
        throw new Error('Failed to delete project');
      }
    },
  },

  lists: {
    create: async (data: typeof lists.$inferInsert) => {
      try {
        const [newList] = await db.insert(lists).values(data).returning();
        return newList;
      } catch(error) {
        console.error('Error creating list:', error);
        throw new Error('Failed to create list');
      }
    },

    update: async (id: string, data: Partial<typeof lists.$inferInsert>) => {
      try {
        const [updated] = await db.update(lists).set({ ...data, updatedAt: new Date() }).where(eq(lists.id, id)).returning();
        return updated;
      } catch(error) {
        console.error(`Error updating list ${id}:`, error);
        throw new Error('Failed to update list');
      }
    },

    delete: async (id: string) => {
      try {
        return await db.delete(lists).where(eq(lists.id, id)).returning();
      } catch(error) {
        console.error(`Error deleting list ${id}:`, error);
        throw new Error('Failed to delete list');
      }
    }
  },

  tasks: {
    getByProject: async (projectId: string) => {
      try {
        const result = await db.query.tasks.findMany({
          where: eq(lists.projectId, projectId),
          with: {
            assignee: true,
            list: true,
            taskCategories: {
              with: {
                category: true,
              }
            },
            comments: true,
          },
          orderBy: [tasks.position],
        });
        
        if(!result) {
          throw new Error('No tasks found for this project.');
        }

          return result;
      } catch (error) {
        console.error(`Error fetching tasks for project ${projectId}:`, error);
        throw new Error('Failed to fetch tasks');
      };
    },

    getByListId: async (listId: string) => {
      try {
        const result = await db.query.tasks.findMany({
          where: eq(tasks.listId, listId),
          orderBy: [tasks.position],
        });
        
        if(!result) {
          throw new Error('No tasks found for this list.');
        }

          return result;
      } catch (error) {
        console.error(`Error fetching tasks for list ${listId}:`, error);
        throw new Error('Failed to fetch tasks');
      };
    },

    create: async (data: typeof tasks.$inferInsert) => {
      try {
        const [newTask] = await db.insert(tasks).values(data).returning();
        return newTask;
      } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Failed to create task');
      }
    },

    update: async (id: string, data: Partial<typeof tasks.$inferInsert>) => {
      try {
        const [updatedTask] = await db.update(tasks).set({ ...data, updatedAt: new Date() }).where(eq(tasks.id, id)).returning();
        return updatedTask;
      } catch (error) {
        console.error(`Error updating task ${id}:`, error);
        throw new Error('Failed to update task');
      }
    },

    delete: async (id: string) => {
      try {
        const [deletedTask] = await db.delete(tasks).where(eq(tasks.id, id)).returning();
        return deletedTask;
      } catch (error) {
        console.error(`Error deleting task ${id}:`, error);
        throw new Error('Failed to delete task');
      }
    },
  },

  comments: {
    getByTaskId: async (taskId: string) => {
      try {
        return await db.query.comments.findMany({
          where: eq(comments.taskId, taskId),
          with: {
            author: true,
          },
          orderBy: [asc(comments.createdAt)],
        });
      } catch (error) {
        console.error(`Error fetching comments for task ${taskId}:`, error);
        throw new Error('Failed to load comments');
      }
    },

    create: async (data: typeof comments.$inferInsert) => {
      try {
        const [newComment] = await db.insert(comments).values(data).returning();
        return newComment;
      } catch (error) {
        console.error('Error creating comment:', error);
        throw new Error('Failed to post comment');
      }
    },

    update: async (id: string, content: string) => {
      try {
        const [updatedComment] = await db.update(comments).set({ content, updatedAt: new Date() }).where(eq(comments.id, id)).returning();
        return updatedComment;
      } catch (error) {
        console.error(`Error updating comment ${id}:`, error);
        throw new Error('Failed to update comment');
      }
    },

    delete: async (id: string) => {
      try {
        const [deletedComment] = await db.delete(comments).where(eq(comments.id, id)).returning();
        return deletedComment;
      } catch (error) {
        console.error(`Error deleting comment ${id}:`, error);
        throw new Error('Failed to delete comment');
      }
    },
  },
};