"use client"
import { redirect} from "next/navigation";
import { useState, useEffect} from "react";

export default function LoginPage(){
    const [loginInfo, setLoginInfo] = useState({})
    const [isAuthenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        if (isAuthenticated){
            redirect('/dashboard')
        }
    }, [isAuthenticated])

    function handleLogin(event: React.ChangeEvent<HTMLInputElement>){
        
        setLoginInfo(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    function handleSubmit(){
        const fetchLogin = async () => {
            console.log(process.env.APP_HOST)
            let response = await fetch(
                `http://localhost:3000/api/v1/login`, {
                    method: "POST",
                    body: JSON.stringify(loginInfo),
                    credentials: "include" // need to set because CORS
                })
            if (response.ok){
                // TODO: set cookie to not back 
                // again to login page if cookie is valid
                let data = await response.json() ?? []
                if (data?.length !== 0){
                    setAuthenticated(true)
                }
            }
        }
        fetchLogin()
    }

    return (
        <div className="flex flex-col items-center h-screen justify-center">
            <div className="flex flex-col border-4 p-2 rounded">
                <div className="flex flex-col items-center p-1">
                    <h3 className="font-semibold">Login</h3>
                </div>
                <div className="flex flex-col p-1">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" className="border-2 py-1 px-2 rounded" onChange={handleLogin}/>
                </div>

                <div className="flex flex-col p-1 mb-1">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="border-2 py-1 px-2 rounded" onChange={handleLogin}/>
                </div>
                <div className="flex flex-col items-center">
                    <button type="button" className="bg-sky-400 p-2 rounded text-white" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}