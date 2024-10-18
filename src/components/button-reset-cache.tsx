'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

const ButtonResetCache = ({ className }: { className?: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild onClick={(e) => e.preventDefault()}>
          <Button
            variant='ghost'
            className={cn('ml-auto w-8 h-8', className)}
            
          >
            <RotateCcw className='text-muted-foreground w-4 h-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent className='bg-white text-primary shadow border border-secondary'>
          <p>Reset images cache</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ButtonResetCache