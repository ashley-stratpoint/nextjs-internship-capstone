"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { queries } from "@/lib/db/index"
import { ProjectFormInput, projectSchema } from "@/lib/validations"


export async function getProjects() {
    const { orgId, userId } = await auth()
    
    if (!orgId || !userId) {
        return [];
    }

    try {
        return await queries.projects.getAll(orgId);
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to load projects.")
    }
}

export async function createProject(values: ProjectFormInput) {
    const { orgId, userId } = await auth()
    if (!orgId || !userId) throw new Error("Unauthorized")

    const validatedFields = projectSchema.safeParse(values)
    if (!validatedFields.success) {
        throw new Error("Invalid form data. Please check your inputs.")
    }

    try {
        const user = await queries.users.getByClerkId(userId)
        if (!user) throw new Error("User profile not found in database.")

        await queries.projects.create({
            projectName: validatedFields.data.projectName,
            description: validatedFields.data.description,
            orgId: orgId,
            ownerId: user.id,
            status: validatedFields.data.status || "active",
            dueDate: validatedFields.data.dueDate ? new Date(validatedFields.data.dueDate) : null,
        })
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to create project in the database.")
    }

  revalidatePath("/projects")
  revalidatePath("/dashboard")
}

export async function updateProject(id: string, values: Partial<ProjectFormInput>) {
    const { orgId } = await auth()
    if (!orgId) throw new Error("Unauthorized")

    const validatedFields = projectSchema.partial().safeParse(values)

    if (!validatedFields.success) {
        throw new Error("Invalid update data.")
    }

    try {
        await queries.projects.update(id, {
            projectName: validatedFields.data.projectName,
            description: validatedFields.data.description,
            status: validatedFields.data.status,
            dueDate: validatedFields.data.dueDate ? new Date(validatedFields.data.dueDate) : undefined,
            updatedAt: new Date(),
        })
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to update project.")
    }

    revalidatePath("/projects")
    revalidatePath(`/projects/${id}`)
    revalidatePath("/dashboard")
}

export async function deleteProject(id: string) {
    const { orgId } = await auth()
    if (!orgId) throw new Error("Unauthorized")
    
    try {
        await queries.projects.delete(id)
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to delete project.")
    }
    
    revalidatePath("/projects")
    revalidatePath("/dashboard ")
}