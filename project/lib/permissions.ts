import { auth } from "@clerk/nextjs/server";

export type Role = "org:admin" | "org:project_manager" | "org:member";

export async function getSessionPermissions() {
  const { userId, orgRole, orgId } = await auth();
  
  const role = orgRole as Role;

  return {
    userId,
    orgId,
    role,
    // Admin & PM can invite
    canInvite: role === "org:admin" || role === "org:project_manager",
    
    // Admin & PM can manage roles (PM cannot change their own)
    canManageRoles: role === "org:admin" || role === "org:project_manager",

    // Members can only CRUD their own projects
    canDeleteProject: (projectOwnerId: string) => {
      if (role === "org:admin" || role === "org:project_manager") return true;
      return userId === projectOwnerId;
    },

    // Comments logic
    canManageComment: (commentAuthorId: string) => {
      if (role === "org:admin" || role === "org:project_manager") return true;
      return userId === commentAuthorId;
    }
  };
}