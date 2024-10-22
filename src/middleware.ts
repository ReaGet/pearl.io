import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const sourceUrl = request.nextUrl

  // if (sourceUrl.pathname === '/api/get')
  //   return NextResponse.redirect(new URL('/get', request.url))

  if (sourceUrl.pathname === '/get')
    return NextResponse.rewrite(new URL('/api/get', request.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}