import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { User } from '@prisma/client'

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
      id: clerkId,
      clerkId
    }
  })
}

export const updateUser = async (userData: Partial<User>) => {
  try {
    const user = await currentUser()
    if (!user) return

    const response = await client.user.update({
      where: {
        clerkId: user.id
      },
      data: {
        ...userData
      }
    })

    return response
  } catch(e) {
    console.log('[updateUser]', e)
  }
}

export const initUser = async () => {
  const user = await currentUser()
  if (!user) return
}