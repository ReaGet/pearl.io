import React from 'react'
import Container from '@/components/container'
import { ChevronsRight, LogOut, User } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { DASHBOARD } from '@/lib/constants'
import { SignOutButton } from '@clerk/nextjs'
import { getAuthUserDetails } from '@/actions/user'
import ProjectsActionProvider from '@/providers/projects-action-provider'
import { currentUser } from '@clerk/nextjs/server'

const LayoutDashboard = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  await getAuthUserDetails()

  return (
    <>
      <header className='py-2'>
        <Container className='flex items-center justify-between'>
          <Link className='flex items-center gap-2 text-2xl' href={DASHBOARD}>
            {/* <ChevronsRight className='text-[#fa9d9d]'/> */}
            {/*
              pink: fa9dd9
              red: fa9d9d
            */}
            {/* <div className='p-1 bg-[#fa9dd9] rounded-lg'>
              <ChevronsRight className='text-white' size='18' />
            </div> */}
            <div className='p-1 bg-black rounded-lg'>
              <ChevronsRight className='text-white' size='18' />
            </div>
            Pearl
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='w-12 h-12 rounded-full border'>
                <User className='w-6 h-6'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel className='pb-0'>Hey, User</DropdownMenuLabel>
              <div className='px-2 text-sm text-primary'>{user?.emailAddresses[0].emailAddress}</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOutButton redirectUrl='/sign-in'>
                  <div className='flex items-center gap-2 w-full'>
                    <LogOut /> Log out
                  </div>
                </SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Container>
      </header>
      <main>  
        <ProjectsActionProvider>
          {children}
        </ProjectsActionProvider>
      </main>
    </>
  )
}

export default LayoutDashboard