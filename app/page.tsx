import Image from "next/image";
import Link from "next/link"; 
import LogoutBtn from "@/elements/logoutbtn";

export default function Home() {
  return (
      <main className="flex min-srenn flex-col p-24 md:px-24 lg:px-48 font-serif">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl">SympTrack</h1>
          <div className="mt-5 border rounded border-blue-500">
          <LogoutBtn />
          </div>
        </div>

        <p className='text-2xl mb-10'>Do you have symptoms of an illness and would like to know what you are suffering from. Do not have the luxury or the time to
          book an appointment with your doctor? We are here to help you. </p>   


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
     <Link href='/create'className="text-lg underline text-blue-900">Get started</Link>
     <hr />
     </section>

     <section id="how_it_works" className="text-2xl p-10 leading-loose">
     <ul>
      <h2 className=" font-serif text-semibold underline text-blue-900">How it works</h2>
      <li>
        1. Sign up and create an account so you can login in later to access your past records
      </li>
      <li>
        2. Go to the Symptom Checker and enter your symptoms and fill out the form. Filling out the form below
        is not compulsury but will help us to provide you with the best results.
      </li>
      <li>
        3. Press the submit button and wait for the results.
      </li>
      <li>
        4. You will then be give a list of probable diagnoses which will show the likelihood of each diagnosis and 
        information and advice.
      </li>
     </ul>
     
     </section>
     
     <section id="why_use_us"className="text-2xl p-10 leading-loose">
     <ul>
      <h2 className=" font-serif text-semibold underline text-blue-900">Why us</h2>
        <li>
        Symtrack gives you a mordern and effcient method of finding out what you may be suffering from. 
        We know the daily challenges that many people face when it come to getting medical help. You might be
        busy and do not have the time to see a medical professional or you might in an area where there are a lack of health facilites. 
        Symtrack gives you a way to find help in the comfort of your own home. Bringing the help to you with a click of a button.
         </li>
         <li>
           Symtrack does not require to travel,book or wait to get results. Our goal is to provide you with a
           a way to get help without wasting yout time or energy. We also aim that we provide medical help to 
           as many people reagardless of situation.
         </li>
       </ul>
     </section>

     <section id="testimonies"className="text-2xl p-10 leading-loose">
      <h2 className=" font-serif text-semibold underline text-blue-900">Testimonies</h2>
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
