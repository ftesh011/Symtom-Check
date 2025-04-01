//Order page where the user will see their previous orders
'use client'
import {useEffect,useState}from 'react'
import {previousOrder}from '@/types'

export default function OrdersPage(){
 const [orders,setOrders]=useState<previousOrder[]>([]);
 useEffect(()=>{
    fetch('/api/orders')
      .then(res=>res.json())
      .then(data=>setOrders(data))
      .catch(err=>console.error('ORDER FETCH ERROR!!:',err));
 },[]);
return (
    <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Previous Orders</h1>
        <div className='space-y-4'>
            {orders.map((order)=>
            <div key={order._id.toString()} className="border-4 border-blue-900 rounded-lg p-4 m-2 bg-blue-300">
              <div className="flex justify-between mb-4">
                <div>
                    <p className='text-lg font-semi-bold text-blue-900'>Order ID: {order._id.toString()}</p>
                    <p className='text-lg font-semi-bold text-blue-900'>Order Date: {new Date (order.orderDate).toLocaleDateString("en-GB")}</p>
                </div>
                <div>
                    <p className='text-lg font-semi-bold text-blue-900'>Total Amount: £{order.totalAmount}</p>
                </div>
                <div className="text-lg text-blue-900">
                    {order.items.map ((item,i)=>(
                        <div key={i} className="flex justify-between py-4">
                            <p>{item.productName} x {item.quantity}</p>
                            <p>{item.price}</p>
                        </div>
                    ))}

                </div>
                <div className="text-lg font-semi-bold text-blue-900">
                    <p>Shipping to: {order.shippingAddress}</p>
                </div>
              </div>
            </div>
            )}
        </div>
    </div>
);
 

}