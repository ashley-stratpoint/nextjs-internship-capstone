"use server"

import { queries } from "@/lib/db/index"
import { revalidatePath } from "next/cache"

export async function deleteProject(id: string) {
  await queries.projects.delete(id)
  revalidatePath("/projects")
}

export async function updateProject(id: string, data: any) {
  await queries.projects.update(id, data)
  revalidatePath("/projects")
}