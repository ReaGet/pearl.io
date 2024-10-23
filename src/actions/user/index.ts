import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const getAuthUserDetails = async () => {
  try {
    const user = await currentUser()
    if (!user) return

    let userData = await client.user.findUnique({
      where: {
        clerkId: user.id
      }
    })

    if (!userData) {
      userData = await createUser(user.id)
    }

    return userData
  } catch(e) {
    console.log('[getAuthUserDetails]', e)
  }
}

const createUser = async (clerkId: string) => {
  return await client.user.create({
    data: {
      clerkId
    }
  })
}

export const initUser = async () => {
  const user = await currentUser()
  if (!user) return
}