'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useProjects } from '@/hooks/project/use-project'

const cacheValues = [
  ['no-cache', 'No cache'],
  ['1', '1 day'],
  ['2', '2 days'],
  ['5', '5 days'],
  ['10', '10 days'],
  ['20', '20 days'],
  ['30', '30 days'],
] as const

export type CacheDurationValues = typeof cacheValues[number][0]

type Props = {
  className?: string
  onChange?: (cacheValue: string) => void
  defaultValue?: CacheDurationValues
  projectId?: string
}

const CacheDuration = ({className, onChange, defaultValue = 'no-cache', projectId}: Props) => {
  const { updateProject, isLoading } = useProjects()
  const [value, setValue] = useState(defaultValue)

  const handleChange = (cacheValue: CacheDurationValues) => {
    if (isLoading) return

    if (onChange) onChange(cacheValue)
    if (projectId) {
      updateProject(projectId, {
        cacheDuration: cacheValue
      }).then(() => {
        setValue(cacheValue)
      })
    } else {
      setValue(cacheValue)
    }
  }

  return (
    <Select value={value} onValueChange={handleChange} disabled={isLoading}>
      <SelectTrigger className={cn(
        'w-full',
        className
      )}>
        <SelectValue placeholder='Cache duration' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cache duration</SelectLabel>
          { cacheValues.map(([value, title]) => (
            <SelectItem value={value} key={value}>{title}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CacheDuration