import { useState } from 'react'
import { createProject, deleteProject, updateProjectDetails } from '@/actions/project'
import { useRouter } from 'next/navigation'
import { removeImages } from '@/actions/image'
import { Project } from '@prisma/client'

export const useProjects = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const addProject = async (data: { url: string, cacheDuration: string}) => {
    if (isLoading) return
    setIsLoading(true)

    return await createProject(data).finally(() => {
      setIsLoading(false)
      router.refresh()
    })
  }

  const updateProject = async (projectId: string, projectData: Partial<Project>) => {
    if (isLoading) return
    setIsLoading(true)

    return await updateProjectDetails(projectId, projectData).finally(() => {
      setIsLoading(false)
      router.refresh()
    })
  }

  const removeProject = async (projectId: string) => {
    if (isLoading) return
    setIsLoading(true)

    return await deleteProject(projectId).finally(() => {
      setIsLoading(false)
      router.replace('/dashboard')
      router.refresh()
    })
  }

  const clearCache = async (projectId: string) => {
    if (isLoading) return
    setIsLoading(true)

    return await removeImages(projectId).finally(() => {
      setIsLoading(false)
      router.refresh()
    })
  }

  return {
    addProject,
    removeProject,
    clearCache,
    updateProject,
    isLoading,
  }
}