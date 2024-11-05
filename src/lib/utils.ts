import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { withBase } from 'ufo'
import { Project } from '@prisma/client'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFaviconUrl = ({ faviconUrl, origin }: Project) => {
  return withBase(faviconUrl || '', origin)
}