import Container from '@/components/container'
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
import SiteItem from '@/components/site-item'
import type { Metadata } from 'next'
import { getProjects } from '@/actions/project'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pearl',
    openGraph: {
      images: 'http://localhost:3000/api/get?url=https://avtoalfa.com',
    },
  }
}

const Dashboard = async () => {
  const projects = await getProjects() || []

  return (
    <Container className='flex flex-col gap-8 mt-16'>
      <div className='w-full'>
        <ButtonAddProject />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
        { projects.map(s => (
          <Link href={`/dashboard/${s.id}`} key={s.id}>
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader className='px-4 pt-4 pb-3'>
                <CardTitle className='flex items-center gap-3'>
                  <SiteItem img={s.favicon ? `${s.url}${s.favicon}` : ''} name={s.name} imgSize={20} />
                  <ButtonResetCache className='-mt-2 -mr-2' />
                </CardTitle>
              </CardHeader>
              <CardContent className='px-4 pb-4 text-sm'>
                <strong>{0}</strong> cached images
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default Dashboard