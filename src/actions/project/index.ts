'use server'
import { client } from "@/lib/prisma"
import { getPuppeteerPage } from "@/lib/screenshot"
import { currentUser } from "@clerk/nextjs/server"
import { Project } from "@prisma/client"
import { parseURLWithProtocol } from '@/lib/url'
import { parse } from 'node-html-parser'
import { removeImages } from "../image"

type ErrorType = {
  name: string
  code: string
  clientVersion: string
  meta: {
    model: string
    target: string[]
  }
}

export const getProjects = async () => {
  try {
    const user = await currentUser()
    if (!user) return
    
    const projects = await client.project.findMany({
      where: {
        userId: user.id
      },
      include: {
        Image: true
      }
    })
    if (projects) {
      return projects
    }
  } catch (e) {
    const error = e as ErrorType
    console.log('[getProjects]:', error)
  }
}

export const getProjectByURL = async (url: string) => {
  try {
    const user = await currentUser()
    if (!user) return
    
    const project = await client.project.findFirst({
      where: {
        origin: parseURLWithProtocol(url).origin
      },
    })

    return project
  } catch (e) {
    const error = e as ErrorType
    console.log('[getProjectByURL]:', error)
  }
}

export const createProject = async ({
  url, cacheDuration
  }: { url: string, cacheDuration: string}) => {
  try {
    const user = await currentUser()
    if (!user) return

    let project = await client.project.create({
      data: {
        origin: parseURLWithProtocol(url).origin,
        cacheDuration: cacheDuration,
        faviconUrl: '',
        userId: user.id,
      }
    })

    project = await getFaviconAndUpdateInfo(project) as typeof project

    if (project) return {
      success: true,
      data: project
    }
  } catch (e) {
    const error = e as ErrorType
    if (error.code === 'P2002') {
      return {
        success: false,
        data: 'Project exists in another account'
      }
    }
    console.log('[createProject]:', error)
  }
}

export const deleteProject = async (projectId: string) => {
  try {
    const user = await currentUser()
    if (!user) return

    const response = await client.project.delete({
      where: { id: projectId }
    })

    await removeImages(projectId)
    
    return response
  } catch(e) {
    const error = e as ErrorType
    console.log('[deleteProject]', error)
  }
}

export const updateProjectDetails = async (projectId: string, projectData: Partial<Project>) => {
  try {
    const user = await currentUser()
    if (!user) return
    console.log(123, projectData)
    const response = await client.project.update({
      where: { id: projectId },
      data: {
        ...projectData,
        // ...(!projectData.cacheDuration ? {} : {
        //   cacheDurationUpdatedAt: new Date()
        // })
      }
    })
    
    return response
  } catch(e) {
    const error = e as ErrorType
    console.log('[updateProjectDetails]', error)
  }
}

type WebsiteBasicInfo = {
  faviconUrl: string
}

const getFaviconAndUpdateInfo = async (project: Project)=> {
  const html = await fetch(project.origin).then(res => res.text())
  const document = parse(html)
  const faviconElement = document.querySelector('link[rel*="icon"]')
  const faviconUrl = faviconElement && faviconElement.getAttribute('href')
  
  return await updateProjectDetails(project.id, {
    faviconUrl: faviconUrl || ''
  })
}

const getWebsiteData = async (url: string): Promise<WebsiteBasicInfo> => {
  try {
    return await getPuppeteerPage(url, async (page) => {
      const faviconUrl = await page.evaluate(() => {
        const faviconElement = document.querySelector('link[rel*="icon"]')
        return faviconElement && faviconElement.getAttribute('href')
      }) || ''
      
      return { faviconUrl }
    })
  } catch(e) {
    console.log(e)
    return {
      faviconUrl: ''
    }
  }
}