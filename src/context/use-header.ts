'use client'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const useHeader = () => {
  const router = useRouter()
  const { signOut } = useClerk()

  const onSignOut = () => signOut(() => router.push('/'))

  return {
    onSignOut
  }
}

export default useHeader