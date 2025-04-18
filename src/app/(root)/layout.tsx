import NavigationBar from '@/components/global/navigation'
import ScrollNavigation from '@/components/global/navigation/scroll-navigation'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <ScrollNavigation />
        <main className='flex-grow lg:pt-4 '>
          {children}
        </main>
    </div>
  )
}

export default RootLayout
