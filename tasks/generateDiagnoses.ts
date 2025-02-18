'use server'
import OpenAI from "openai";
//import {v2 as cloudinary} from 'cloudinary';
import mdbclient from "@/DiaDB";
import { redirect } from "next/navigation";
import { DiagnosesUserInput } from "@/types";
import { generateDiagnosesPrompt } from "@/tools";


//Cloudnairy client
//cloudinary.config({
   // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   // api_key: process.env.CLOUDINARY_API_KEY,
   // api_secret: process.env.CLOUDINARY_SECRET_KEY
// });

// AI client 
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


export default async function generateDiagnoses(symptoms: string[], diagnosesUserinput: DiagnosesUserInput){
    const db = await mdbclient.db('Symptom-Check');
    let diagnosesPath;
  try {
        console.log(symptoms);

        //Generate Diagnoses
        const diagnosesPrompt = generateDiagnosesPrompt(symptoms, diagnosesUserinput);
     

        console.log(diagnosesPrompt);

       // OpenAI API call
        const diagnosesCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: diagnosesPrompt
                }
            ],
            model:'gpt-4o-mini',
            temperature: 0.3,
            response_format: {type: 'json_object'}
        });

        console.log(diagnosesCompletion.choices[0].message.content);
        const content = diagnosesCompletion.choices[0].message.content as string;
        const diagnosesData = JSON.parse(content);

        // //Generate image trial 1
        // const diagnosesTitle = diagnosesData?.title;

        // if(!diagnosesTitle) {
        //     throw new Error("Diagnoses title is required for image output !");
        // }
        
        // const imagePrompt = `${diagnosesTitle}, icon of health condition.`;

        // //Open Dalle API call
        // const imageCompletion = await openai.images.generate({
        //     model: 'dall-e-2',
        //     prompt: imagePrompt,
        //     size: '1024x1024',
        //     quality: 'standard'
        // });

        // console.log(imageCompletion);

         // Mongodb storage of diagnoses
         const savedDiagnoses = await db.collection('diagnoses').insertOne({
            diagnoses_content: content, 
         });

         console.log(savedDiagnoses);

         diagnosesPath = savedDiagnoses.insertedId;

    } catch (error) {
        console.log(error);
    } finally {
        redirect(`/diagnoses/${diagnosesPath}`);
    }
}
//Make sure to order them from top to bottom based on probabilty of the diagnosis.
//So have the most likley diagnosis at the top and the least likely diagnosis at the bottom.
//Make sure u highlisght how likely they are.
//Make sure you provide a description of the diagnosis, advice on how to ease the effects
//of the symtopms and provide reccomendations on medicine that should be taken to help. Each 
//diagnosis decription should be less than 500 words.