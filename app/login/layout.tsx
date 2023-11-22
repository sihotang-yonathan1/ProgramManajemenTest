import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'Halaman login',
}

export default function LoginLayout({children}: {children: React.ReactNode}){
    return (
        <div>
            {children}
        </div>
    )
}