// Saving the order to the users to give them the ability to see their previous orders

import { NextResponse } from 'next/server';
import mdbclient from "@/DiaDB";
import { getSession } from '@/hold/auth';


// Fetching user's sorders
export async function GET() {
    try{ 
    const session=await getSession();
    if(!session?.user?.id){
        return NextResponse.json(
            {error:'Not authorized'},
            {status:401}
        );
    }
    const db=await mdbclient.db('Symptom-Check');
    const orders=await db.collection('orders')
    .find({userid:session.user.id})
    .sort({orderDate:-1})
    .toArray();
    return NextResponse.json(orders);

    }catch(error){
        console.error("Fteching orders failed",error);
        return NextResponse.json(
            {error:"Failed to fetch orders !!!"},
            {status:500}
        );
    }

 } 
   export async function POST(req:Request){
    try{
    const session=await getSession();
    if(!session?.user?.id){
        return NextResponse.json(
            {error:"Not allowed"},
            {status:401}
        );
    }
    const body=await req.json();
    const order={
        ...body,
        userid:session.user.id,
        orderDate:new Date()
    };
    const db=await mdbclient.db('Symptom-Check');
    await db.collection('orders').insertOne(order);
    return NextResponse.json({message: "ORDER CREATED AND PLACED SUCCESSFULLY"},
        {status:201}
    );
  }catch(error){
    console.error("Creation of order failed!!!",error);
    return NextResponse.json(
        {error:"Created order = failed"},
        {status:500}
    )
  }
}

