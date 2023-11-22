import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'Halaman login',
  }

export default function LoginPage(){
    return (
        <div className="flex flex-col items-center h-screen justify-center">
            <div className="flex flex-col border-4 p-2 rounded">
                <div className="flex flex-col items-center p-1">
                    <h3 className="font-semibold">Login</h3>
                </div>
                <div className="flex flex-col p-1">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" className="border-2 py-1 px-2 rounded" />
                </div>

                <div className="flex flex-col p-1 mb-1">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="border-2 py-1 px-2 rounded"/>
                </div>
                <div className="flex flex-col items-center">
                    <button type="button" className="bg-sky-400 p-2 rounded text-white">Login</button>
                </div>
            </div>
        </div>
    )
}