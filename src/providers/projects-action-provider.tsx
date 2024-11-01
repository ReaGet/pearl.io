'use client'
import React, { createContext, useContext, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useProjects } from '@/hooks/project/use-project'

type ProjectsActionContext = {
  applyAction: (projectId: string, action: Actions) => void
}

const ProjectsActionContext = createContext<ProjectsActionContext | null>(null)

type Actions = 'clearCache' | 'removeProject' | 'none'

const ProjectsActionProvider = ({ children }: { children: React.ReactNode }) => {
  const { removeProject, isLoading } = useProjects()
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState<Actions>()
  const [projectId, setProjectId] = useState<string|null>(null)

  const applyAction = (projectId: string, action: Actions) => {
    setAction(action)
    setProjectId(projectId)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setProjectId(null)
    setAction('none')
  }

  const handleAccept = async () => {
    if (action === 'clearCache') {}
    if (action === 'removeProject' && projectId)
      await removeProject(projectId)

    handleClose()
  }

  const context: ProjectsActionContext = {
    applyAction
  }

  return (
    <ProjectsActionContext.Provider value={context}>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        {children}
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
            <DialogFooter className='flex-row justify-end'>
              <DialogClose asChild>
                <Button type='button' variant='outline' disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='button' variant='default' onClick={handleAccept} disabled={isLoading}>
                Accept
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProjectsActionContext.Provider>
  )
}

export const useProjectActionsContext = () => {
  const context = useContext(ProjectsActionContext)
  if(!context) {
    throw new Error(
      "ProjectsActionContext has to be used within <ProjectsActionContext.Provider>"
    );
  }
  return context;
}

export default ProjectsActionProvider