'use client'
import {useState} from 'react';
import Basket from '@/elements/basket';

// This page is for the store where 
// the user can purchase medicinal products 
// that do not require a prescription
// These products are not suppossed to cure the problem
// rather ease the symptoms of the problem

//Array of the medicinal products
const medicinalproducts = [

    {
        id: 1,
        productname: "Acetaminophen",
        description: "A pain reliver and fever reducer. Helps with muscle pain, headaches, general flu symptoms and overall minor pains",
        price: "£7.99",
        image: "/ill_Lady.png"//placeholder for appropriate image  

    },
    {
        id: 2,
        productname: "Ibroprofen",
        description: "A NSAID that reduces inflammation, fever and pain. Particulary helps with joints pain, menstrual cramps and insignificant pains",
        price: "£8.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image  

    },
    {
        id: 3,
        productname: "Antihistamine",
        description: "A drug that ease and controls the symptoms of allergies, itching, hives and colds",
        price: "£10.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 4,
        productname: "Ancid reducers",
        description: "Digestion aids used in cases of heartburn, acid reflux and indigestion",
        price: "£9.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 5,
        productname: "Asprin",
        description: "Pain reliver and fever reducer with anti-inflammatory properties. Primarly used for headches, muscle pain and heart health complications",
        price: "£6.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 6,
        productname: "Naproxen",
        description: "A long term NSAID that eases inflammation, fever and arthritis pain also helps with back pain and menstrual cramps",
        price: "£8.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 7,
        productname: "Hydrocortisone Cream",
        description: "A cream used to treat itching, rahses, insect bites an d other minor irriataitons that occur due to allegric reactions ",
        price: "£11.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 8,
        productname: "Antifungal Cream",
        description: "Treats fungal infections coomonly athletes foot, yeast infections and ringworm",
        price: "£11.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 9,
        productname: "Loperamide",
        description: "Medicinal product used to treat and control diarrhea and ease the impacts of food poisoning or flu",
        price: "£8.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 10,
        productname: "Meclizine",
        description: "Used to treat symptoms of nausea, vomimting, dizziness and motion sickness",
        price: "£6.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 11,
        productname: "Fiber Supplements",
        description: "Supplements for regulating digestion and supports gut health",
        price: "£9.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 12,
        productname: "Laxatives",
        description: "Used to relives constipations and imporves regualr bowel movements",
        price: "£8.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 13,
        productname: "Probiotics",
        description: "Support gut health and used for bloating, diarrhea and antibiotic side effects",
        price: "£10.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 14,
        productname: "Electrolyte fluids",
        description: "Used to provide needed fluids and minerlas ina a time of dehydration from illness, heat or exercise",
        price: "£11.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 15,
        productname: "Melatonin",
        description: "An organic sleep aid to help with sleeep disorders speciffically for insomia or jet lag",
        price: "£8.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 16,
        productname: "Bismuth Subsalicylate",
        description: "Helps with stomache problems such as nausea, diarrhea, indigestion and upset stomach",
        price: "£7.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 17,
        productname: "Activated Charcoal",
        description: "Used to asorb harmful toxins in cases of mild food poisoning or digestive discomfort",
        price: "£10.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 18,
        productname: "Topical pain relievers",
        description: "Provides relief from pain sore muscles, joint pain and minor injuries",
        price: "£12.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 19,
        productname: "Oral Anesthetic",
        description: "Helps to numb pain in the oral area like toothaches, gum irritrations and mouth sores",
        price: "£9.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
    {
        id: 20,
        productname: "Aloe Vera Gel",
        description: "Used to soothe burns, surnburns and skin irritations",
        price: "£7.99",
        image: "/ill_Lady.png"  //placeholder for appropriate image    
    },
]

export default function StorePage() {
    // Each product will have an id name number and qauntity when added to the basket
    const [basket, setBasket] = useState<Array<{
        id:number;
        productName:string;
        price:string;
        quantity:number;
    }>>([]);
    // The ability to add product to basket 
    const addToBasket=(product:typeof medicinalproducts[0])=>{
        setBasket(prevItems => {
            const existingItem = prevItems.find(item=>item.id === product.id);
            if(existingItem){
                return prevItems.map(item=>
                    item.id ===product.id
                    ?{...item,quantity:item.quantity+1}
                    :item
                );
            }
            return[...prevItems,{...product,productName:product.productname,quantity:1}];
        });
    };
    const removeFromBasket=(id:number)=>{
        setBasket(prevItems=> prevItems.filter(item=>item.id !==id))
    };
    const updateQuantity=(id:number,quantity:number)=>{
        if(quantity ===0){
            removeFromBasket(id);
            return;
        }
        setBasket(prevItems=>
            prevItems.map(item=>
             item.id ===id ?
             {...item,quantity}:item
            )
        );
    };
    return (
    <div className="flex">
        <div className="p-5 flex-grow">
            <h1 className="text-4xl font-bold mb-10">Store</h1>
            <p className="text-sm">Welcome to the store. Here you can purchase medicinal products that do not require a prescription.
                These products are not necessarily inteded to cure the problem rather to ease the affects of the symptoms</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {medicinalproducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-bold">{product.productname}</h2>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-lg font-bold">{product.price}</p>
                        <button
                            onClick={() => addToBasket(product)}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900">
                            Add to Basket
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <div className="w-80 sticky top-4">
            <Basket
                items={basket}
                onRemoveProduct={removeFromBasket}
                onUpdateQuantity={updateQuantity}
            />
        </div>
    </div>
);
}
        