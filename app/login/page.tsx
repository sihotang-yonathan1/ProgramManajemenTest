"use client"
import { redirect} from "next/navigation";
import { useState, useEffect} from "react";
import { sendLoginInfo } from "../api/v1/login/check_credential";

type ErrorInfoType = {
    'isError': boolean,
    'error': {
        'http_code': number,
        'http_message': string,
    }
}

type LoginInfo = {
    'username': string, 
    'password': string
}

export default function LoginPage(){
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        username: '',
        password: ''
    })
    const [errorInfo, setErrorInfo] = useState<ErrorInfoType>({
        'isError': false,
        'error': {
            'http_code': 200,
            'http_message': 'Ok'
        }
    })
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
            let data = await sendLoginInfo(loginInfo['username'], loginInfo['password'])
            if (data == null){
                setErrorInfo(prev => ({
                    ...prev, 
                    isError: true,
                    error: {
                        http_code: 403,
                        http_message: 'Invalid Login'
                    }
                }))
            }
            else {
                setAuthenticated(true)
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
                {errorInfo.isError && 
                <div className="flex flex-col items-center bg-red-500 text-white my-2">
                    <p>Error Occured</p>
                    <p>{errorInfo.error.http_code}: {errorInfo.error.http_message}</p>
                </div>}
            </div>
        </div>
    )
}