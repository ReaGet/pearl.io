'use client'
import { Button } from '@/components/ui/button'
import { Grid2x2Plus, LoaderCircle } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useProjects } from '@/hooks/project/use-project'
import { FormEvent, useState } from 'react'
import { cn } from '@/lib/utils'

const ButtonAddProject = () => {
  const { isLoading, addProject } = useProjects()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return

    addProject(url).then((data) => {
      if (!data) return
      if (data.success) {
        setIsOpen(false)
        setUrl('')
      } else {
        setError(data.data as string)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-sm font-bold'>
          <Grid2x2Plus className='w-4 h-4' />
          <span>Site</span>
        </Button>
      </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription>
              Add link of target site
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={e => handleSubmit(e)} className='flex flex-col gap-4'>
            <div className='flex items-center space-x-2'>
              <div className='grid flex-1 gap-1'>
                <Input
                  id='link'
                  placeholder='https://site.ru'
                  value={url}
                  onChange={e => {
                    setError('')
                    setUrl(e.target.value)
                  }}
                  className={
                    cn({
                      'text-red-500 border-current': error
                    })
                  }
                />
                { error && (
                  <span className='text-xs text-red-500'>{error}</span>
                )}
              </div>
            </div>
            <DialogFooter className='flex-row justify-end'>
              <Button type='submit' disabled={isLoading} className='w-32'>
                { isLoading ? (
                  <LoaderCircle size='16' className='animate-spin' />
                ) : (
                  'Create Project'
                )}
              </Button>
              <DialogClose asChild>
                <Button type='button' variant='ghost' asChild className='cursor-pointer'>
                  <div>Close</div>
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}

export default ButtonAddProject