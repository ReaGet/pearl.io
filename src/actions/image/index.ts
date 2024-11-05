'use server'
import { createFolder, imageSavingPath, removeFolder } from '@/lib/folders'
import { client } from '@/lib/prisma'
import { screenshotViewport } from '@/lib/screenshot'
import { parseURLWithProtocol } from '@/lib/url'
import { currentUser } from '@clerk/nextjs/server'
import { Project } from '@prisma/client'
import { withoutTrailingSlash, resolveURL } from 'ufo'

export const getImages = async (projectId: string) => {
  try {
    const user = await currentUser()
    if (!user) return
    
    const images = await client.image.findMany({
      where: { projectId },
    })

    if (images) return images.map(i => ({
      ...i,
      src: `${imageSavingPath(projectId)}/${i.src}`
    }))
  } catch (e) {
    console.log('[getImages]:', e)
  }
}

export const getImage = async (link: string) => {
  try {
    const user = await currentUser()
    if (!user) return

    const { origin, pathname } = parseURLWithProtocol(link)
    
    const image = await client.image.findFirst({
      where: {
        link: withoutTrailingSlash(resolveURL(origin, pathname)),
      },
    })

    if (image) return image
  } catch (e) {
    console.log('[getImage]:', e)
  }
}

export const removeImages = async (projectId: string) => {
  try {
    const imageSavePath = imageSavingPath(projectId)
    const user = await currentUser()
    if (!user) return
    // TODO: remove images from disk
    const response = await client.image.deleteMany({
      where: {
        projectId
      }
    })

    await removeFolder(`public/${imageSavePath}`)
  } catch (e) {
    console.log('[removeImages]:', e)
  }
}

export const createImage = async (project: Project, link: string, delay: number) => {
  const imageSavePath = imageSavingPath(project.id)
  await createFolder(`public/${imageSavePath}`)

  const imageName = await screenshotViewport(link, project.id, delay)
  if (!imageName) return

  const { origin, pathname } = parseURLWithProtocol(link)

  try {
    const image = await client.image.create({
      data: {
        src: `${imageSavePath}/${imageName}.jpg`,
        projectId: project.id,
        link: withoutTrailingSlash(resolveURL(origin, pathname)),
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