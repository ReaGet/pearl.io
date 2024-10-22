import Container from '@/components/container'
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import ButtonAddSite from '@/components/button-add-site'
import ButtonResetCache from '@/components/button-reset-cache'
import { sites } from '@/lib/constants'
import SiteItem from '@/components/site-item'
import type { Metadata, ResolvingMetadata } from 'next'
import { usePathname } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pearl',
    openGraph: {
      images: 'http://localhost:3000/api/get',
    },
  }
}

const Dashboard = () => {
  return (
    <Container className='flex flex-col gap-8 mt-16'>
      <div className='w-full'>
        <ButtonAddSite />
      </div>
      <div className='grid grid-cols-4 gap-8'>
        { sites.map(s => (
          <Link href={`/dashboard/${s.id}`} key={s.id}>
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader className='px-4 pt-4 pb-3'>
                <CardTitle className='flex items-center gap-3'>
                  <SiteItem {...s} imgSize={20} />
                  <ButtonResetCache className='-mt-2 -mr-2' />
                </CardTitle>
              </CardHeader>
              <CardContent className='px-4 pb-4 text-sm'>
                <strong>{s.cached}</strong> cached images
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default Dashboard