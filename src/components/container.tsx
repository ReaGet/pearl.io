import { cn } from '@/lib/utils'
import React from 'react'

const Container = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={cn(
      'w-full max-w-[1230px] px-6 mx-auto',
      className
    )}>
      {children}
    </div>
  )
}

export default Container