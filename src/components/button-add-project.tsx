'use client'
import { Button } from '@/components/ui/button'
import { Grid2x2Plus } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAddProject } from '@/hooks/project/use-project'

const ButtonAddProject = () => {
  const { loading } = useAddProject()

  return (
    <Dialog open={true}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-sm font-bold'>
          <Grid2x2Plus className='w-4 h-4' />
          <span>Site</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Add link of target site
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder='https://site.ru'
              defaultValue='https://avtoalfa.com/'
            />
          </div>
        </div>
        <DialogFooter className="flex-row justify-end">
          <Button type="button" disabled={loading}>
            Create
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="ghost" asChild className='cursor-pointer'>
              <div>Close</div>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ButtonAddProject