// route for visual represention for confimr user is logged in 
import {NextResponse}from'next/server'
import {getSession}from'@/hold/auth'
import {collection} from '../../../src/mongodb'
import {ObjectId}from'mongodb'

export async function GET(){
    try{
    const session=await getSession();
    if(!session?.user?.id){
        return NextResponse.json(
            {error:"Not authorized"},
            {status:401}
        )
    }
    //Locating user via ID 
    const user=await collection.findOne({_id:new ObjectId(session.user.id)})
    if(!user){
        return NextResponse.json(
            {error:"User not found!"},
            {status:404}
        )
    }
    //Name will be shown visually
    return NextResponse.json({
        name:user.name,
    })
}catch(error){
    console.error("Fetching user ERROR!!!", error)
    return NextResponse.json(
        {error:"Fetching user action failed!!!"},
        {status:500}
    )
}
    }
