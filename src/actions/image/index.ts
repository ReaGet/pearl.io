import { client } from '@/lib/prisma'
import { screenshotViewport } from '@/lib/screenshot'
import { currentUser } from '@clerk/nextjs/server'
import { Project } from '@prisma/client'
import { parseURL, resolveURL } from 'ufo'

export const getImages = async (projectId: string) => {
  try {
    const user = await currentUser()
    if (!user) return
    
    const images = await client.image.findFirst({
      where: { projectId},
    })

    if (images) return images
  } catch (e) {
    console.log('[getImages]:', e)
  }
}

export const getImage = async (link: string) => {
  try {
    const user = await currentUser()
    if (!user) return
    
    const image = await client.image.findFirst({
      where: {
        link
      },
    })

    if (image) return image
  } catch (e) {
    console.log('[getImage]:', e)
  }
}

export const createImage = async (project: Project, link: string, delay: number) => {
  const imageName = await screenshotViewport(link, delay)
  if (!imageName) return

  const { host, pathname} = parseURL(link)

  try {
    const image = await client.image.create({
      data: {
        name: imageName,
        projectId: project.id,
        link: resolveURL(host, pathname),
      }
    })

    return image
  } catch(e) {
    console.log('[createImage]', e)
  }
}

export const getOrCreateImage = async (project: Project, link: string, delay: number) => {
  const user = await currentUser()
  if (!user) return

  let image = await getImage(link)

  if (!image) {
    image = await createImage(project, link, delay)
  }

  return image
}