'use server'
import { createFolder, imageSavingPath, removeFile, removeFolder } from '@/lib/folders'
import { client } from '@/lib/prisma'
import { screenshotViewport, screenshotViewportBlob } from '@/lib/screenshot'
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

    response.count
    await removeFolder(`public/${imageSavePath}`)
  } catch (e) {
    console.log('[removeImages]:', e)
  }
}

export const removeImage = async (link: string) => {
  try {
    const user = await currentUser()
    if (!user) return
    
    const image = await getImage(link)

    if (image) {
      const imageSavePath = imageSavingPath(image.projectId)
      console.log('[removeImages]:', image.id)
      await removeFile(`public/${imageSavePath}`, image.id)

      const response = await client.image.delete({
        where: {
          id: image.id
        }
      })
  
    }
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
        id: imageName.split('.')[0],
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

const createImageNoCache = async (link: string, delay: number) => {
  const imageByteArray = await screenshotViewportBlob(link, delay)

  if (imageByteArray)
      return new Blob([new Uint8Array(imageByteArray).buffer], {
      type: 'image/jpeg'
    })

  return null
}

export const getOrCreateImage = async (project: Project, link: string, delay: number) => {
  const user = await currentUser()
  if (!user) return
  let image = null

  if (project.cacheDuration === 'no-cache') {
    return await createImageNoCache(link, delay)
  }
  
  image = await getImage(link)

  if (image) {
    const currentDate = new Date()
    const createdAt = new Date(image.createdAt)
    createdAt.setDate(createdAt.getDate() + parseInt(project.cacheDuration))

    if (createdAt < currentDate) {
      await removeImage(link)
      image = await createImage(project, link, delay)
    }
  } else {
    image = await createImage(project, link, delay)
  }

  return image
}