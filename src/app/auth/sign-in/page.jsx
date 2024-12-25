'use client'
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useState } from "react";

export default function SignIn(){
    const [userName,setUserName] = useState(null)
    const [password,setPassword] = useState(null)
    const handleUserNameChange = (e)=>{
        setUserName(e.target.value)
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    const handleSignIn = (e)=>{
        e.preventDefault()
        console.log(userName,password)
    }
    return <div className="border p-2 grow h-full flex flex-col items-center justify-center">
        <form className="border p-2 flex flex-col gap-4 h-1/2 w-4/5 rounded justify-center" onSubmit={handleSignIn}>
            <h1 className="text-2xl text-center">Sign In To Continue</h1>
            <Input label="Username" value={userName} onChange={handleUserNameChange}  placeholder="Enter your Username"/>
            <Input label="Username" value={password} onChange={handlePasswordChange}  placeholder="Enter your Password" type="password"/>
            <Button type='submit' placeHolder="Sign In"/>
            <p className="text-center text-xs">Not A user ? Click <a href="/auth/sign-up" className="underline-offset-auto underline">here</a> to sign up</p>
        </form>
    </div>
}