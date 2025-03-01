// The Logout button action will be constructed here 
// for the use of the user to log out of the session

'use client'
import { useRouter } from "next/navigation"
import { useState} from "react"

export default function LogoutBtn(){
    const router=useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout=async()=>{
        setIsLoading(true)
        try{
            const response=await fetch('/api/logout',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
            })
            //when the logout function does not go through
            //then the user will be redirected to the login page
            if (response.ok) {
                router.push('/Login')
                router.refresh()
            }
        }catch(error){
            console.error("Failure in the logout process",error)
        }finally{
            setIsLoading(false)
        }
}
return(
    <button
    onClick={handleLogout}
    disabled={isLoading}
    className="bg-blue-800 text-black px-4 py-2 rounded hover:bg-blue-900 disabled:opacity-50"
    >
      {isLoading? "Logging out..." :"Logout"}
    </button>
)
}