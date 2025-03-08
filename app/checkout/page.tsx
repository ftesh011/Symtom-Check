'use client'
import { useState} from 'react'
import { useRouter} from 'next/navigation'

// Form for Checkout 
interface checkoutForm{
    name: string;
    address: string;
    cardNumber: string;
    dateofExpiry: string;
    cVV: string;
}
export default function CheckoutPage(){
    const router =useRouter();
    const [formData, setFormData]=useState<checkoutForm>({
        name:'',
        address:'',
        cardNumber:'',
        dateofExpiry:'',
        cVV:'',
    });
    // Presents it to the user 
    const [showSuccessMessage, setShowSuccessMessage] =useState(false);
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        setShowSuccessMessage(true);
        setTimeout(()=>{
            router.push('/store');
        },3000);
    };
    return(
          <div className="container mx-auto p-4 max-w-2xl ">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {showSuccessMessage ? (
                <div className="bg-green-200 border border-green-600 text-blue-800 px-4 py-3 rounded">
                    <h2 className="text-lg font-semibold mb-2">Your order has been successfully been purchased</h2>
                    <p>Name:{formData.name}</p>
                    <p>Address:{formData.address}</p>
                    <p className="mt-2">Redirection to the store</p>
                    </div>
            ):(
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
            )}
          </div>
    );
 }
    

