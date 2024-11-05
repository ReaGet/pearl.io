import Container from '@/components/container'
import React from 'react'
import { DASHBOARD } from '@/lib/constants'
import { redirect } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronDown, Slice } from 'lucide-react'
import Link from 'next/link'
import ProjectIdentity from '@/components/project-identity'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getProjects } from '@/actions/project'
import ProjectCardActions from '@/components/project-card-actions'
import { parseURLWithProtocol } from '@/lib/url'
import { withBase } from 'ufo'
import { Project } from '@prisma/client'
import CacheDuration, { CacheDurationValues } from '@/components/cache-duration'

type Props = {
  params: {
    id: string
  }
}

export const getFaviconUrl = ({ faviconUrl, origin }: Project) => {
  return withBase(faviconUrl || '', origin)
}

const ProjectPage = async ({ params }: Props) => {
  const projects = await getProjects() || []
  const currentProject = projects.find(s => s.id === params.id)

  if (!currentProject) return redirect(DASHBOARD)

  const handleCacheChange = (cacheValue: string) => {
  }
    
  return (
    <Container className='flex flex-col gap-8 mt-8'>
      <div className='mb-6'>
        <Button variant='ghost' asChild>
          <Link href={DASHBOARD}>
            <ArrowLeft size='16' />
            Back
          </Link>
        </Button>
      </div>
      <div className='flex items-center justify-between gap-6'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='rounded-sm'>
              <ProjectIdentity img={getFaviconUrl(currentProject)} name={parseURLWithProtocol(currentProject.origin).host} />
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='start'>
            {projects.map(p => (
              p.id === currentProject.id
              ? null
              : (
                <Link href={`${DASHBOARD}/${p.id}`} key={p.id}>
                  <DropdownMenuItem key={p.id} className='cursor-pointer'>
                    <ProjectIdentity img={getFaviconUrl(p)} name={parseURLWithProtocol(p.origin).host} />
                  </DropdownMenuItem>
                </Link>
              )
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <Button variant='ghost' className='text-sm font-bold'>
          <Slice className='w-4 h-4' />
          Add Route
        </Button> */}
        <div className='flex items-center gap-4'>
          <CacheDuration className='w-[180px]' projectId={currentProject.id} defaultValue={(currentProject.cacheDuration as CacheDurationValues)} />
          <ProjectCardActions projectId={currentProject.id} />
        </div>
      </div>
      <Alert>
        { currentProject.Image.length
          ? (
            currentProject.Image.map(i => (
              <div className='flex items-center gap-4 px-2 py-1 text-muted-foreground rounded-md text-left hover:bg-muted' key={i.id}>
                <span className='max-w-[520px] line-clamp-1 text-black'>{i.link}</span>
                <div className='h-8 w-16 ml-auto'>
                  <img src={`/${i.src}`} className='h-full w-full object-contain' loading='lazy' />
                </div>
              </div>
            ))
          )
          : (
            <AlertDescription>No cached images</AlertDescription>
          )
        }
      </Alert>
    </Container>
  )
}

export default ProjectPage