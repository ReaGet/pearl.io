'use server'
import { client } from "@/lib/prisma"
import { getPuppeteerPage } from "@/lib/screenshot"
import { currentUser } from "@clerk/nextjs/server"
import { Project } from "@prisma/client"
import { withHttps, parseURL } from 'ufo'

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
    console.log('[getProjects]:', e)
  }
}

export const getProjectByURL = async (url: string) => {
  try {
    const user = await currentUser()
    if (!user) return
    
    const project = await client.project.findFirst({
      where: {
        name: parseURL(url || '').host
      },
    })

    return project
  } catch (e) {
    console.log('[isProjectExists]:', e)
  }
}

export const createProject = async (url: string) => {
  try {
    const user = await currentUser()
    if (!user) return
    
    const { hostname, origin, pathname } = new URL(withHttps(url))

    const project = await client.project.create({
      data: {
        name: hostname,
        url: `${origin}${pathname}`,
        cacheDuration: '14',
        favicon: '',
        userId: user.id,
      }
    })

    getFaviconAndUpdateInfo(project)

    if (project) return project
  } catch (e) {
    console.log('[createProject]:', e)
  }
}

export const deleteProject = async (projectId: string) => {
  try {
    const user = await currentUser()
    if (!user) return

    const response = await client.project.delete({
      where: { id: projectId }
    })
    
    return response
  } catch(e) {
    console.log('[deleteProject]', e)
  }
}

export const updateProject = async (projectId: string, projectData: Partial<Project>) => {
  try {
    const user = await currentUser()
    if (!user) return

    const response = await client.project.update({
      where: { id: projectId },
      data: { ... projectData }
    })
    
    return response
  } catch(e) {
    console.log('[updateProject]', e)
  }
}

type WebsiteBasicInfo = {
  favicon: string
}

const getFaviconAndUpdateInfo = (project: Project) => {
  getWebsiteData(project.url).then(data => {
    updateProject(project.id, data)
  })
}

const getWebsiteData = async (url: string): Promise<WebsiteBasicInfo> => {
  try {
    return await getPuppeteerPage(url, async (page) => {
      const faviconUrl = await page.evaluate(() => {
        const faviconElement = document.querySelector('link[rel*="icon"]')
        return faviconElement && faviconElement.getAttribute('href')
      })
      
      return {
        favicon: faviconUrl
      }
    })
  } catch(e) {
    console.log(e)
    return {
      favicon: ''
    }
  }
}