import Container from '@/components/container'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Grid2x2Plus, PlusIcon } from 'lucide-react'

const sites = [
  { img: "/images/avtoalfa.svg", name: "avtoalfa.com", images: 122 },
  { img: "/images/steners.ico", name: "steners.com", images: 37 },
]

const Dashboard = () => {
  return (
    <Container className='flex flex-col gap-8 mt-16'>
      <div className='w-full'>
        <Button variant='outline' className='text-base font-bold'>
          <Grid2x2Plus />
          <span>Site</span>
        </Button>
      </div>
      <div className='grid grid-cols-4 gap-8'>
        { sites.map(s => (
          <Link href="/" key={s.name}>
            <Card className="_w-[300px] hover:shadow-sm transition-shadow">
              <CardHeader className='pt-4 pb-3'>
                <CardTitle className='flex items-center gap-3'>
                  <img src={s.img} width="24" height="24" />
                  {s.name}
                </CardTitle>
              </CardHeader>
              <CardContent className='pb-4 text-sm'>
                <strong>{s.images}</strong> images
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default Dashboard