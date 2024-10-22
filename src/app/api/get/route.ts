import { screenshotViewport } from "@/lib/screenshot"
import { NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url)
  const queryUrl = url.searchParams.get('url')
  const delay = parseInt(url.searchParams.get('delay') || '')

  if (!queryUrl) return new Response(null, {
    status: 404,
  })

  const image = await screenshotViewport(queryUrl, delay)

  return new Response(image, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg'
    }
  })
}