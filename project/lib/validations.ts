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

export const uuidSchema = z.string().uuid();

export const orgSchema = z.object({
  orgName: z.string()
    .min(1, 'Organization name is required')
    .max(100, 'Organization name too long'),
  clerkOrgId: z.string()
    .min(1, 'Clerk Organization ID is required')
    .max(100, 'Clerk Organization ID too long'),
})

export const userProfileSchema = z.object({
  clerkId: z.string()
    .min(1, 'Clerk ID is required'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  firstName: z.string()
    .min(1, 'First name is required')
    .max(100, 'First name is too long (max 100 characters)'),
  lastName: z.string()
    .max(100, 'Last name is too long (max 100 characters)')
    .optional(),
  imageUrl: z.string()
    .url('Invalid image URL')
    .optional(),
  role: z.enum(['member', 'project_manager', 'admin'])
    .default('member'),
  orgId: uuidSchema,
})


export const projectSchema = z.object({
  projectName: z.string()
    .min(1, 'Project name is required')
    .max(100, 'Project name is too long (max 100 characters)'),
  description: z.string()
    .optional()
    .or(z.literal('')),
  status: z.enum(['active', 'completed', 'on-hold']).
    default('active'),
  dueDate: z.coerce.date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Invalid due date')
    .optional(),
})

export const listSchema = z.object({
  listName: z.string()
    .min(1, 'List name is required')
    .max(50, 'List name is too long (max 50 characters)'),
  position: z.number().int().nonnegative(),
})

export const taskSchema = z.object({
  taskTitle: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title is too long'),
  description: z.string()
    .optional()
    .or(z.literal('')),
  assigneeId: z.string()
    .optional(),
  status: z.enum(['todo', 'in_progress', 'review', 'done', 'backlog'])
    .default('todo'),
  priority: z.enum(['low', 'medium', 'high'])
    .default('medium'),
  dueDate: z.coerce.date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Invalid due date')
    .optional(),
})

export const commentSchema = z.object({
  content: z.string()
    .min(1, 'Invalid comment'),
  taskId: z.string()
    .min(1, 'Task reference is required'),
  authorId: z.string()
    .min(1, 'Author reference is required'),
})

export type ProjectInput = z.infer<typeof projectSchema>
export type TaskInput = z.infer<typeof taskSchema>