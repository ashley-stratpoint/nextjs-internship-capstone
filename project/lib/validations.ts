// TODO: Task 3.6 - Set up data validation with Zod schemas

/*
TODO: Implementation Notes for Interns:

1. Install Zod: pnpm add zod
2. Create validation schemas for all forms and API endpoints
3. Add proper error messages
4. Set up client and server-side validation

Example schemas needed:
- Project creation/update
- Task creation/update
- User profile update
- List/column management
- Comment creation

Example structure:
import { z } from 'zod'

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  dueDate: z.date().min(new Date(), 'Due date must be in future').optional(),
})

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date().optional(),
  assigneeId: z.string().uuid().optional(),
})
*/

// Placeholder exports to prevent import errors
/* export const projectSchema = "TODO: Implement project validation schema"
export const taskSchema = "TODO: Implement task validation schema"
export const userSchema = "TODO: Implement user validation schema"
export const listSchema = "TODO: Implement list validation schema"
export const commentSchema = "TODO: Implement comment validation schema" */


import { z } from 'zod';

// 1. Project Schema
export const projectSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name is too long (max 100)'),
  description: z.string()
    .max(500, 'Description must be under 500 characters')
    .optional()
    .or(z.literal('')),
  status: z.enum(['active', 'completed', 'on-hold']).default('active'),
  dueDate: z.coerce.date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Due date cannot be in the past')
    .optional(),
})

// 2. Task Schema
export const taskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title is too long'),
  description: z.string()
    .max(1000, 'Description is too long')
    .optional()
    .or(z.literal('')),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.string().optional(), // Used for Kanban column mapping
  dueDate: z.coerce.date().optional(),
  assigneeId: z.string().optional(), // Clerk User ID
})

// 3. User Profile Schema
export const userSchema = z.object({
  username: z.string()
    .min(3, 'Username too short')
    .max(20, 'Username too long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
  bio: z.string().max(160, 'Bio must be under 160 characters').optional(),
})

// 4. List / Column Schema (for the Kanban board)
export const listSchema = z.object({
  title: z.string()
    .min(1, 'List title required')
    .max(50, 'Title too long'),
  order: z.number().int().nonnegative(),
})

// 5. Comment Schema
export const commentSchema = z.object({
  content: z.string()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment too long'),
  taskId: z.string().min(1, 'Task reference is required'),
})

// Type Inference for your components
export type ProjectValues = z.infer<typeof projectSchema>
export type TaskValues = z.infer<typeof taskSchema>
