'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import ButtonAddProject from '@/components/button-add-project'
import ButtonResetCache from '@/components/button-reset-cache'
import { sites } from '@/lib/constants'
import SiteItem from '@/components/site-item'
import { getProjects } from '@/actions/project'
import { getAuthUserDetails } from '@/actions/user'
import { useProjects } from '@/hooks/project/use-project'

const Projects = () => {
  const { projects } = useProjects()
  console.log(projects)
  return (
    <>
      <div className='w-full'>
        <ButtonAddProject />
      </div>
      <div className='grid grid-cols-4 gap-8'>
        { projects.map(s => (
          <Link href={`/dashboard/${s.id}`} key={s.id}>
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader className='px-4 pt-4 pb-3'>
                <CardTitle className='flex items-center gap-3'>
                  <SiteItem img={`${s.url}${s.favicon}`} name={s.name} imgSize={20} />
                  <ButtonResetCache className='-mt-2 -mr-2' />
                </CardTitle>
              </CardHeader>
              <CardContent className='px-4 pb-4 text-sm'>
                {/* <strong>{s?.cached || 0}</strong> cached images */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Projects