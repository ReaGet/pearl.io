import { getOrCreateImage } from '@/actions/image'
import { getProjectByURL } from '@/actions/project'
import { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const $url = new URL(request.url)
  const url = $url.searchParams.get('url') || ''
  const delay = parseInt($url.searchParams.get('delay') || '')

  if (!url) return new Response(null, {
    status: 404,
  })
  
  const project = await getProjectByURL(url)

  if (!project) {
    console.log('There is no project:', project)
    return new Response(null, {
      status: 404,
    })
  }

  const image = await getOrCreateImage(project, url, delay)

  if (!image) {
    console.log('There is no image:', image)
    return new Response(null, {
      status: 404,
    })
  }

  let imageBlob = null

  if (typeof image === 'object' && !(image instanceof Blob))
    imageBlob = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${image.src}`).then(res => res.blob())
  else
    imageBlob = image

  return new Response(imageBlob, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg'
    }
  })
}