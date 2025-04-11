import React from 'react'
export const dynamic = "force-dynamic"
const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            {children}
        </div>
    )
}

export default AuthenticationLayout
