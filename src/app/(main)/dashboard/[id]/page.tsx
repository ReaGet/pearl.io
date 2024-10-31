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
import SiteItem from '@/components/site-item'
import ButtonResetCache from '@/components/button-reset-cache'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getProjects } from '@/actions/project'

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
              <SiteItem img={currentProject.favicon ? `${currentProject.url}${currentProject.favicon}` : ''} name={currentProject.name} />
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
                    <SiteItem img={s.favicon ? `${s.url}${s.favicon}` : ''} name={s.name} />
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
          <ButtonResetCache />
        </div>
      </div>
      <Alert>
        { projects?.cachedRoutes?.length
          ? (
            projects.cachedRoutes.map(r => (
              <div className='flex gap-4 p-2 text-muted-foreground rounded-md text-left hover:bg-muted' key={r.id}>
                <span className='max-w-[220px] line-clamp-1 text-black'>{r.title}</span>
                <span>|</span>
                <span>{r.route}</span>
                <div className='ml-auto'>
                  <img src={projects.img} />
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