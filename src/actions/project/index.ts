import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const getProjects = async () => {
  try {
    const user = await currentUser()
    if (user) {
      const projects = await client.project.findMany({
        where: {
          userClerkId: user.id
        },
      })
      if (projects) {
        return projects
      }
    }
  } catch (e) {
    console.log(e)
  }
}