import Container from '@/components/container'
import React from 'react'
import { DASHBOARD, sites } from '@/lib/constants'
import { redirect } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronDown, Slice } from 'lucide-react'
import Link from 'next/link'
import ProjectIdentity from '@/components/project-identity'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getProjects } from '@/actions/project'
import ProjectCardActions from '@/components/project-card-actions'

type Props = {
  params: {
    id: string
  }
}

const ProjectPage = async ({ params }: Props) => {
  const projects = await getProjects() || []
  const currentProject = projects.find(s => s.id === params.id)

  if (!currentProject) return redirect(DASHBOARD)
    
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
              <ProjectIdentity img={currentProject.favicon ? `${currentProject.url}${currentProject.favicon}` : ''} name={currentProject.name} />
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='start'>
            {projects.map(s => (
              s.id === currentProject?.id
              ? null
              : (
                <Link href={`${DASHBOARD}/${s.id}`} key={s.id}>
                  <DropdownMenuItem key={s.id} className='cursor-pointer'>
                    <ProjectIdentity img={s.favicon ? `${s.url}${s.favicon}` : ''} name={s.name} />
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
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Cache duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cache duration</SelectLabel>
                <SelectItem value="no-cache">No cache</SelectItem>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="2">2 days</SelectItem>
                <SelectItem value="5">5 days</SelectItem>
                <SelectItem value="10">10 days</SelectItem>
                <SelectItem value="20">20 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

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
                  <img src={`/${i.name}.jpg`} className='h-full w-full object-contain' loading='lazy' />
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