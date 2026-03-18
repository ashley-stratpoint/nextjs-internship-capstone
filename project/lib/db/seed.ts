import { db } from './index';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import * as schema from './schema';
import { 
  organizations, users, projects, lists, tasks, comments 
} from './schema';

const REAL_NAMES = [
  { first: "Aly", last: "Abo" }, // Your preferred identity
  { first: "Stacy", last: "Manager" }, // Your supervisor
  { first: "Juan", last: "Dela Cruz" },
  { first: "Maria", last: "Santos" },
  { first: "Paolo", last: "Reyes" },
  { first: "Liza", last: "Soberano" },
  { first: "Ken", last: "Chan" },
  { first: "Catriona", last: "Gray" },
  { first: "Jose", last: "Rizal" },
];

async function main() {
  try {
    console.log('🚀 Resetting database...');
    await db.delete(comments);
    await db.delete(tasks);
    await db.delete(lists);
    await db.delete(projects);
    await db.delete(users);
    await db.delete(organizations);

    console.log('🏗️ Seeding Organizations...');
    const orgData = [
      { orgName: "Stratpoint Interns", clerkOrgId: "org_3AYwXc7G3w1Eg0M5PClg8oZND6P" },
      { orgName: "Ashley's Organization", clerkOrgId: "org_3Ab1tIRBijT2RSowms471jzxdKR" },
    ];
    const insertedOrgs = await db.insert(organizations).values(orgData).returning();

    console.log('👥 Seeding Users...');
    const usersToInsert: any[] = [];
    
    // 1. INSERT YOU AS THE PRIMARY USER FIRST
    // This ensures you are always in the DB with your real Clerk ID
    usersToInsert.push({
      clerkId: "user_3ACS8eOdc9nWC5uKNTGfcsKtAQe", // YOUR ACTUAL CLERK ID
      email: "intern@stratpoint.com",
      firstName: "Aly",
      lastName: "Abo",
      role: 'admin',
      orgId: insertedOrgs[0].id,
    });

    // 2. Insert Other Mock Users
    for (const org of insertedOrgs) {
      const roles = [
        { role: 'project_manager' as const, count: 2, prefix: 'pm' },
        { role: 'member' as const, count: 4, prefix: 'mem' },
      ];

      for (const r of roles) {
        for (let i = 1; i <= r.count; i++) {
          const nameIdx = Math.floor(Math.random() * REAL_NAMES.length);
          usersToInsert.push({
            clerkId: `clerk_${r.prefix}_${i}_${org.id}`,
            email: `${r.prefix}${i}@${org.clerkOrgId.slice(0, 8)}.com`,
            firstName: REAL_NAMES[nameIdx].first,
            lastName: REAL_NAMES[nameIdx].last,
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
      const admin = orgUsers.find(u => u.role === 'admin') || orgUsers[0];

      // Realistic Project Names
      const projectNames = [
        "PUP L.A.U.N.C.H. Platform",
        "ISKOtrack Smart Rental",
        "D.A.N.A.S Productivity App",
        "SI.MU.LA Community Blog",
        "Internal Admin Dashboard"
      ];

      for (const name of projectNames) {
        const [project] = await db.insert(projects).values({
          projectName: name,
          description: `Strategic initiative for ${org.orgName} focusing on full-stack optimization.`,
          ownerId: admin.id,
          orgId: org.clerkOrgId,
          status: 'active',
          progress: Math.floor(Math.random() * 100),
          dueDate: new Date('2026-12-31'),
        }).returning();

        const [list] = await db.insert(lists).values({
          listName: 'To Do',
          projectId: project.id,
          position: 1,
        }).returning();

        // Seed 5 Tasks per project
        const tasksToInsert = ["Setup Drizzle Schema", "Integrate Clerk Auth", "Design UI Layout", "Configure Server Actions", "Deploy to Vercel"].map((title, t) => ({
          taskTitle: title,
          description: `Detailed requirements for ${title}`,
          listId: list.id,
          assigneeId: orgUsers[Math.floor(Math.random() * orgUsers.length)].id,
          status: (t === 0 ? 'done' : 'in_progress') as any,
          priority: (t === 0 ? 'urgent' : 'medium') as any,
        }));
        
        await db.insert(tasks).values(tasksToInsert);
      }
    }

    console.log('✅ Seeding Complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));