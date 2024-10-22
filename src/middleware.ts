import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api(.*)', '/'])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})
 
// export function middleware(request: NextRequest) {
//   const sourceUrl = request.nextUrl

//   // if (sourceUrl.pathname === '/api/get')
//   //   return NextResponse.redirect(new URL('/get', request.url))

//   if (sourceUrl.pathname === '/get')
//     return NextResponse.rewrite(new URL('/api/get', request.url))

//   return NextResponse.next()
// }

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}