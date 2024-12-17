'use server'
import OpenAI from "openai";


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


export default async function generateDiagnoses(symptoms: string[]){
    try {
        console.log(symptoms);

        //Generate Diagnoses
        const diagnosesPrompt =
        `
        Output the 2 diagnosis based on only the following symptoms: 
        ` + 
    symptoms.join(',') + 
        `

        Give each diagnosis a title.
        Format each diagnosis in a HTML body with sematic elements.
        Give back the results in JSON as follow:
        {
          title: Diagnosis title,
          diagnosis: Two sentence description of diagnosis formatted in HTML
        }
          Don't add any other markup. 
        `;
        console.log(diagnosesPrompt);

        //OpenAI API call
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


    } catch (error) {
        console.log(error);
    }
}
//Make sure to order them from top to bottom based on probabilty of the diagnosis.
//So have the most likley diagnosis at the top and the least likely diagnosis at the bottom.
//Make sure u highlisght how likely they are.
//Make sure you provide a description of the diagnosis, advice on how to ease the effects
//of the symtopms and provide reccomendations on medicine that should be taken to help. Each 
//diagnosis decription should be less than 500 words.