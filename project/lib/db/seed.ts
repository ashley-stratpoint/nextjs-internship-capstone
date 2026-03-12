import { db } from './index';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import * as schema from './schema';
import { 
  organizations, users, projects, lists, tasks, comments 
} from './schema';

async function main() {
  try {
    console.log('🚀 Resetting database...');
    // Delete in specific order to avoid foreign key constraint errors
    await db.delete(comments);
    await db.delete(tasks);
    await db.delete(lists);
    await db.delete(projects);
    await db.delete(users);
    await db.delete(organizations);

    console.log('🏗️ Seeding Organizations...');
    const orgData = [
      { orgName: "Stratpoint Software Engineer Interns", clerkOrgId: "org_3AYwXc7G3w1Eg0M5PClg8oZND6P" },
      { orgName: "Ashley's Organization", clerkOrgId: "org_3Ab1tIRBijT2RSowms471jzxdKR" },
      { orgName: "Orkestra Communications", clerkOrgId: "org_ork_001" },
    ];
    const insertedOrgs = await db.insert(organizations).values(orgData).returning();

    console.log('👥 Seeding Users...');
    const usersToInsert: any[] = [];
    
    for (const org of insertedOrgs) {
      // Create 2 Admins, 2 PMs, 5 Members per org
      const roles = [
        { role: 'admin' as const, count: 2, prefix: 'admin' },
        { role: 'project_manager' as const, count: 2, prefix: 'pm' },
        { role: 'member' as const, count: 5, prefix: 'mem' },
      ];

      for (const r of roles) {
        for (let i = 1; i <= r.count; i++) {
          usersToInsert.push({
            clerkId: `clerk_${r.prefix}_${i}_${org.clerkOrgId}`,
            email: `${r.prefix}${i}@${org.clerkOrgId}.com`,
            firstName: r.role.charAt(0).toUpperCase() + r.role.slice(1),
            lastName: `${i}`,
            role: r.role,
            orgId: org.id,
          });
        }
      }
    }
    const insertedUsers = await db.insert(users).values(usersToInsert).returning();

    console.log('📂 Seeding Projects & Tasks...');
    for (const org of insertedOrgs) {
      const orgUsers = insertedUsers.filter(u => u.orgId === org.id);
      const admin = orgUsers.find(u => u.role === 'admin')!;

      // 5 Projects per Org
      for (let p = 1; p <= 5; p++) {
        const [project] = await db.insert(projects).values({
          projectName: `${org.orgName} Project ${p}`,
          description: `High-priority initiative for ${org.orgName}`,
          ownerId: admin.id,
          orgId: org.clerkOrgId,
          status: 'active',
          progress: Math.floor(Math.random() * 100),
          //memberCount: orgUsers.length,
          dueDate: new Date('2026-12-31'),
        }).returning();

        const [list] = await db.insert(lists).values({
          listName: 'General Tasks',
          projectId: project.id,
          position: 1,
        }).returning();

        // Seed Tasks
        const tasksToInsert = Array.from({ length: 10 }).map((_, t) => ({
          taskTitle: `Task ${t + 1} for ${project.projectName}`,
          description: `Detailed requirements for task ${t + 1}`,
          listId: list.id,
          assigneeId: orgUsers[Math.floor(Math.random() * orgUsers.length)].id,
          status: (t % 3 === 0 ? 'done' : 'in_progress') as any,
          priority: (t % 4 === 0 ? 'urgent' : 'medium') as any,
        }));
        
        const insertedTasks = await db.insert(tasks).values(tasksToInsert).returning();

        // Seed Comments
        for (const task of insertedTasks) {
          const taskComments = Array.from({ length: 3 }).map((_, c) => ({
            content: `Comment ${c + 1} on this task.`,
            taskId: task.id,
            authorId: orgUsers[Math.floor(Math.random() * orgUsers.length)].id,
          }));
          await db.insert(comments).values(taskComments);
        }
      }
    }

    console.log('✅ Seeding Complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Ensure the process waits for the promise and then exits
main()
  .then(() => {
    console.log('👋 Database connection closing...');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });