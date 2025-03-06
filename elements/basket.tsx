// Basket section is used when the user will
// add items from the store page to their basket

'use client'
import {useState} from 'react'

// Items from the store will be converted into a basket item
interface BasketProduct {
    id: number;
    productName: string;
    price: string;
    quantity: number;
}
interface BasketProps {
    items: BasketProduct[];
    onRemoveProduct:(id:number)=>void;
    onUpdateQuantity:(id:number,quantity:number)=>void;
}
export default function Basket({items, onRemoveProduct, onUpdateQuantity}:BasketProps) {
    // Establishing the status of the basket and total price if the basket
    const total = items.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('£', ''));
        return sum + price * item.quantity;
},0);
return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-lg font-medium mb-4">Shopping Basket</h2>
        {items.length === 0 ? (
            <p>Your basket is empty</p>
        ) : (
            <>
            {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2 pb-2 border-b">
                <div>
                     <p className="font-semibold">{item.productName}</p>
                     <p className="text-gray-600">{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        {/* This will allow the user to increase the amount of the same product if demanded likewise minus the amount */}
                        -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        +
                    </button>
                        {/* Here the user will have the ability to remove the product in total */}

                    <button
                        onClick={() => onRemoveProduct(item.id)}
                        className="ml-2 text-red-500 hover:text-red-600"
                    >    
                        Remove
                    </button>
                </div>
                </div>
            ))}
            <div className="mt-4 pt-2 border-t">
                <p className="text-xl font-bold">Total: £{total.toFixed(2)}</p>
                <button className="mt-2 w-full bg-blue-600 text-white px-4 rounded hover:bg-blue-900">
                    Checkout
                </button>
            </div>
            </>
        )}
    </div>
 );

}


