"use client"
import { FormEvent, useState } from "react"
import generateDiagnoses from "@/tasks/generateDiagnoses";

export default function CreatePage() {
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
     try {
         e.preventDefault();
         setLoading(true);
         console.log(symptoms);
         generateDiagnoses(symptoms);
     } catch (error) {
        console.log(error); 
     } finally{
         setLoading(false);
     }
    }
    

    


    return(
        <div className="h-screen bg-gradient-to-r from-green-200 to bg-red-700" >
            <h1 className="text-5xl font-mono pt-10 ml-5">Find the Diagnosis</h1>

             <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit} className="flex flex-col w-96 h-96">
                    <label 
                    htmlFor="symptoms"
                    className="font-bold text-lg text-center underline mt-10"
                >
                    What symptoms are you experiencing?
                    </label>

                    <textarea 
                    onChange={(e) => setSymptoms(e.target.value.split(","))}
                    id="symptoms"
                    className="border mt-2 flex-1 p-1 font-sans"
                    placeholder="Enter symptoms seperated by commas: (ex: fatigue, coughing sweating)"
                     required
                    />
                    
                    <input 
                    type="submit"
                    className="mt-5 border rounded bg-green-500 text-white p-1 mx-5 md:mx-0
                    border-green-500 hover:border-green-950 hover:cursor-pointer"
                    />
                    <label className="bg-white-500 text-black p-1 mx-5 md:mx-0" >
                    We are tyring to provide you the best results so please be patient as we provide the results</label>
                </form>

             </div>

        </div>
    )
}