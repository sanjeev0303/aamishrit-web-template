// import NavigationBar from '@/components/global/navigation'
import ScrollNavigation from '@/components/global/navigation/scroll-navigation'
import React from 'react'
import { Toaster } from 'sonner'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <ScrollNavigation />
        <main className='flex-grow lg:pt-6'>
            <Toaster position='top-center'  />
          {children}
        </main>
    </div>
  )
}

export default RootLayout
