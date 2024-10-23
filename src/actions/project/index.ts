import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const getProjects = async () => {
  try {
    const user = await currentUser()
    if (!user) return
    
    const projects = await client.project.findMany({
      where: {
        userClerkId: user.id
      },
    })
    if (projects) {
      return projects
    }
  } catch (e) {
    console.log('[getProjects]:', e)
  }
}

export const createProject = async (url: string) => {
  try {
    const user = await currentUser()
    if (!user) return

    const project = client.project.create({
      data: {
        name: new URL(url).hostname
      }
    })
  } catch (e) {
    console.log('[createProject]:', e)
  }
}