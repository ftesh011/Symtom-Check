import Image from "next/image";
import Link from "next/link"; 
import LogoutBtn from "@/elements/logoutbtn";

export default function Home() {
  return (
      <main className="flex min-srenn flex-col p-24 md:px-24 lg:px-48 font-serif">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl">SympTrack</h1>
          <div className="border-2 border-blue-500">
          <LogoutBtn />
          </div>
        </div>

        <p className='text-2xl mb-10'>"Do you have symptoms of an illness and would like to know what you are suffering from."</p>   


     <div className= "w-full h-auto">
      <Image
      sizes="100vw"
      width={1024}
      height={1024}
      style={{width: '100%', height: 'auto'}}
      src='/Ill_Lady.jpg'
      alt="Ill Lady"
      />
     </div>
     <section id='ring_section' className="p-12 my-12">
     <p className="text-4xl pb-5">
      Do not worry about the possibilites of what you may be suffering from 
     </p>
     <Link href='/create'className="text-lg">Get started</Link>
     <hr />
     </section>

     <section id="how_it_works" className="text-2xl p-10 leading-loose">
     <ul>
      <h2>How it works</h2>
      <li>
        1. How it works 
      </li>
      <li>
        2. How it works
      </li>
     </ul>
     
     </section>
     
     <section id="why_use_us"className="text-2xl p-10 leading-loose">
     <ul>
      <h2>Why us</h2>
        <li>
        1. Reason why
         </li>
         <li>
           2. Reason why
         </li>
       </ul>
     </section>

     <section id="testimonies"className="text-2xl p-10 leading-loose">
      <h2>Testimonies</h2>
      <p>
        "This app is great I wish I had known about it earlier.
        In the past I have struggled with finding the condition sthat I have"-John
      </p>
      <p>
        "Wow great I would reccommened this tyo famliy and freinds.
        I am also A health pofessional and would use this on my patients"-Lenny
      </p>
     </section>

   </main>
  );
}
