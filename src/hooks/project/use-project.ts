import { useState } from 'react'
import { createProject } from '@/actions/project'
import { useRouter } from 'next/navigation'

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

  return {
    addProject,
    isLoading
  }
}