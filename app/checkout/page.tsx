'use client'
import { useState} from 'react'
import { useRouter,useSearchParams} from 'next/navigation'

export default function CheckoutPage(){
    const router =useRouter();
    const searchParams=useSearchParams();
    const [formData, setFormData]=useState({
        name:'',
        address:'',
        cardNumber:'',
        dateofExpiry:'',
        cVV:'',
    });
    const [isSubmitting, setIsSubmitting]=useState(false);
    // Fater order user presses the order button, they shown a message that the order has been orderd successfully
    const[showSuccess, setShowSuccess]=useState(false);
    //This funnction will allow the use form and allow the order function to be implmemented on the checkout.
    // Presents it to the user 
    //Bakset URL params
    const items =searchParams.get('items')?
    JSON.parse(decodeURIComponent(searchParams.get("items")||'[]')):[]
    const total=searchParams.get('total')?
    parseFloat(searchParams.get('total')|| '0'):0;

    //Fetching the orders 
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        setIsSubmitting(true);
    try{
        const resposne=await fetch('/api/orders',{
            method:"POST",
            headers:{
            'Content-Type':'application/json',
            },
            body:JSON.stringify({
                items:items,
                totalAmount:total,
                shippingAddress:formData.address,
            }),
        });
        if(resposne.ok){
            //This will send the users to the orders page when they have successfully purchased the order.
            setShowSuccess(true);
            setTimeout(()=>{
            router.push("/orders");
        },2000);
        }else{
            throw new Error('CREATION OF ORDER FAILED');
        }
    }catch(error){
        console.error("Creating order failed!!!",error);
    }finally{
        setIsSubmitting(false);
    }
    };
    //message for successfull order
    if(showSuccess){
        return(
            <div className="container mx-auto p-4 max-w-4xl">
              <div className="bg-blue-900 text-white px-4 border border-blue-800 rounded-lg py-3 mb-2">
                <h2 className="text-lg font-serif">Order Successfully Purchased</h2>
                <p>Your order is currently being processsed and will be automatically be processed</p>
                <p className="mt-4">Redirecting to Orders...</p>
              </div>
            </div>
        )
    }
    return(
          <div className="container mx-auto p-4 max-w-2xl ">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            
            {/* Summary of the ordfer for user's view  */}
                
                <div className="bg-green-200 border border-green-600 text-blue-800 px-4 py-3 rounded">
                    <h2 className="text-lg font-semibold mb-2">Here is the summary of your order:</h2>
                    {items.map((item:any,index:number)=>(
                    <div key={index} className="flex justify-between py-4">
                    <p>Product: {item.productName} x{item.quantity}</p>
                    <p>Price: {item.price}</p>
                    </div>
                ))}
                <div className="border-t mt-4pt-4">
                <div className="flex justify-between font-serif">
                    <p>Total:</p>
                    <p>£{total.toFixed(2)}</p>
                </div>
                </div>
                </div>
                {/* Form */}

                {/* Name */}
                <form onSubmit={handleSubmit}className="space-y-4">
                    <div>
                        <label className="block text-sm font-serif">Your Full Name</label>
                        <input
                        type="text"
                        required
                        className="w-full p-2 border rounded"
                        value={formData.name}
                        onChange={(e)=>setFormData({...formData, name:e.target.value})}
                        />
                    </div>
                    {/* Address */}
                    <div>
                        <label className="block text-sm font-serif">Address for delivery</label>
                        <input
                        type="text"
                        required
                        className="w-full p-2 border rounded"
                        value={formData.address}
                        onChange={(e)=>setFormData({...formData,address:e.target.value})}
                        />
                    </div>
                    {/* Card Number */}
                    <div>
                        <label className="block text-sm font-serif">Card Number</label>
                        <input
                        type="text"
                        required
                        pattern="{0-9}{16}"
                        className="w-full p-2 border rounded"
                        placeholder="Enter your card number: 0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={(e)=>setFormData({...formData,cardNumber:e.target.value})}
                        />
                    </div>
                    {/* Expiration Date */}
                    <div>
                        <label className="block text-sm font-serif">Expiration Date</label>
                        <input
                        type="text"
                        required
                        pattern="[0-9]{2}/[0-9]{2}"
                        placeholder="MM/YY"
                        className="w-full p-2 border rounded"
                        value={formData.dateofExpiry}
                        onChange={(e=>setFormData({...formData, dateofExpiry:e.target.value}))}
                        />
                    </div>
                    {/* CVV */}
                    <div>
                        <label className="block text-sm font-serif">CVV</label>
                        <input
                        type="text"
                        required
                        pattern="[0-9]{3,4}"
                        className="w-full p-2 border rounded"
                        placeholder="Enter your CVV: It is the last 3 digits at the back of yout card"
                        value={formData.cVV}
                        onChange={(e=>setFormData({...formData,cVV:e.target.value}))}
                        />
                    </div>
                    <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                         Purchase Order
                    </button>
                </form>
          </div>
    );
 }
    

