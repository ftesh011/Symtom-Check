'use server'
import OpenAI from "openai";


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


export default async function generateDiagnoses(symptoms: string[]){
    try {
        console.log(symptoms);

    } catch (error) {
        console.log(error);
    }
}