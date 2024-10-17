import Container from '@/components/container'
import { ChevronsRight, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className='py-2'>
        <Container className='flex items-center justify-between'>
          <Link className='flex items-center gap-2 text-2xl' href='/dashboard'>
            <ChevronsRight />
            Pearl
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className='w-12 h-12 rounded-full border'>
                <User className='w-12 h-12'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className='pb-0'>Hey, User</DropdownMenuLabel>
              <div className='px-2 text-sm text-primary'>rifat2125@gmail.com</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Container>
      </header>
      <main>{children}</main>
    </>
  )
}

export default LayoutDashboard