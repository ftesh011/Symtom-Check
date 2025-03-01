//Logout route is for the user to come out of the session
// and not to allow anyone else to have access to the previous
// results
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
    // User will have the abilty to lougout if successful
    const response=NextResponse.json(
        {message:"Logout has been sucessful"},
        {status:200}
    )
   // The cookie that the user has which allows them to access the session
   // will be cleared out
   response.cookies.set("session", '',{
    httpOnly: true,
    // Cookie expriation will take place here 
    expires: new Date(0), 
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" ,
   })
   return response
}catch(error){
    console.error("Error in logout process:" , error)
    return NextResponse.json(
        {error:"There was an error in the logout process"},
        {status:500}
    )
}
    }



