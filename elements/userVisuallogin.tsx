'use client'
// Visual login element
import {useState, useEffect} from 'react'
import LogoutBtn from './logoutbtn'
// import used for removing the "Welcome, username from login and Sign up pages"
import {usePathname} from 'next/navigation'

export default function UserVisualLogin(){
    const [username, setUsername]=useState<string>('')
    const pathname=usePathname()
    
useEffect(() => {
    // to hide "Welcome,username on both pages (Signup/Login)"
    if(pathname==='/Login'|| pathname==='/SignUp') {
        return;
    }
    // Allow for fetching of the 
    // user's username
    fetch('/api/uservisual')
    .then(res=>res.json())
    .then(data=>{
        if(data.name){
            setUsername(data.name)
        }
    })
    .catch(err=>console.error("Fetching for username Failed",err));
},[pathname])
//Do not render L/S page 
if(pathname==='/Login'|| pathname==='/SignUp') {
    return null
}

return(
    <div className="flex items-center gap-8">
        {username && (
            <span className="text-blue-800 font-serif font-semibold">
                Welcome, {username}
            </span>
        )}
        <div className="border rounded p-2">
        <LogoutBtn/>
        </div>
    </div>
)
}