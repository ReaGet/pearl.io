import { useState } from 'react'
import { createProject, deleteProject } from '@/actions/project'
import { useRouter } from 'next/navigation'
import { removeImages } from '@/actions/image'

export const useProjects = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const addProject = async (url: string) => {
    if (isLoading) return
    setIsLoading(true)

    return await createProject(url).finally(() => {
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
    isLoading,
  }
}