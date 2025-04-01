'use server'
import OpenAI from "openai";
import mdbclient from "@/DiaDB";
import { redirect } from "next/navigation";
import { DiagnosesUserInput } from "@/types";
import { generateDiagnosesPrompt } from "@/tools";
import { getSession } from "@/hold/auth";   


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

        // User ID will be from the session token 
        const session = await getSession();
        if (!session?.user?.id) {
            console.log("Session",session)
            throw new Error("Log in to get diagnoeses");
        }

         // Mongodb storage of diagnoses
         const savedDiagnoses = await db.collection('diagnoses').insertOne({
            diagnoses_content: content, 
            userid: session.user.id,
            createdAt: new Date()
         });

         console.log(savedDiagnoses);

         diagnosesPath = savedDiagnoses.insertedId;

    } catch (error) {
        console.log(error);
    } finally {
        redirect(`/diagnoses/${diagnosesPath}`);
    }
}
