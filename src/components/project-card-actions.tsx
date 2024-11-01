'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical, RotateCcw, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useProjectActionsContext } from '@/providers/projects-action-provider'

type Props = {
  projectId: string
  className: string
}

const ProjectCardActions = ({ projectId, className }: Props) => {
  const { applyAction } = useProjectActionsContext()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className={cn('rounded-sm w-9 h-9', className)}>
          <EllipsisVertical size='18' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48' align='start' onClick={e => e.preventDefault()}>
        <DropdownMenuItem className='flex items-center justify-between w-full' onClick={() => applyAction(projectId, 'clearCache')}>
          Clear cache 
          <RotateCcw className='text-muted-foreground w-3 h-3' />
        </DropdownMenuItem>
        <DropdownMenuItem className='flex items-center justify-between w-full' onClick={() => applyAction(projectId, 'removeProject')}>
          Remove project
          <Trash className='text-muted-foreground w-3 h-3' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProjectCardActions