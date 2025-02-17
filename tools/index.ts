import { DiagnosesUserInput } from "@/types";

// Help function
// Grabs each key which will run rejects to find uppercases
// Will then replace it with a space
// 2nd first letter will make the first letter uppercase

const formatKey = (key: string) => {
    return key
    .replace(/([A-Z])/g, "$1")
    .replace(/^./, (str) => str.toUpperCase());
};

export function generateDiagnosesPrompt(
    symptoms: string[],
     diagnosesUserinput: DiagnosesUserInput,
    ) {

        //Prompt Segments Array
        const promptSegments = [    
       `Output 5 diagnoses based on only the following symptoms.
        Make sure to order them from top to bottom based on probabilty of the diagnosis.
        So have the most likley diagnosis at the top and the least likely diagnosis at the bottom.
        Make sure u highlight how likely they are with a percentage.
        Make sure you provide a description of the diagnosis, advice on how to ease the effects
        of the symtopms and provide reccomendations on medicine that should be taken to help. Each 
        diagnosis decription should be less than 500 words:\n`,
        ...symptoms,
        'Make sure the diagnoeses use the following details\n',
        //Make sure the diagnoses follows the following preferences\n
    ];
    // Loop over the diagnoses imputs by user add exclusions/inputs to array 
     Object.entries(diagnosesUserinput).forEach(([key, value]) =>{
        if(Array.isArray(value) && value.length > 0) {
            promptSegments.push(`User Exclusions: ${value.join(', ')}\n`)
        } else{
            promptSegments.push(`${formatKey(key)}: ${value}\n`)
        }
     }) 

     


    promptSegments.push(
        `
        Give each diagnosis a title.
        Format each diagnosis in a HTML body with sematic elements.
        Give back the results in JSON as follow:
        {
          title: Diagnosis title,
          diagnosis: Percentage chance of diagnosis and description of diagnosis less than 500 words formatted in HTML
        }
          Don't add any other markup outside the specified structure. 
        `);

        return promptSegments.join('');
}

// `
//         Output 5 diagnoses based on only the following symptoms: 
//         Make sure to order them from top to bottom based on probabilty of the diagnosis.
//         So have the most likley diagnosis at the top and the least likely diagnosis at the bottom.
//         Make sure u highlight how likely they are with a percentage.
//         Make sure you provide a description of the diagnosis, advice on how to ease the effects
//         of the symtopms and provide reccomendations on medicine that should be taken to help. Each 
//         diagnosis decription should be less than 500 words.
//         ` + 
//     symptoms.join(',') + 
//         `


//         Give each diagnosis a title.
//         Format each diagnosis in a HTML body with sematic elements.
//         Give back the results in JSON as follow:
//         {
//           title: Diagnosis title,
//           diagnosis: Percentage chance of diagnosis and description of diagnosis less than 500 words formatted in HTML
//         }
//           Don't add any other markup outside the specified structure. 
//         `;



// `
// Give each diagnosis a title.
// Format each diagnosis in a HTML body with sematic elements.
// Give back the results in JSON as follow:
// {
//   title: Diagnosis title,
//   diagnosis: Percentage chance of diagnosis and description of diagnosis less than 500 words formatted in HTML
// }
//   Don't add any other markup outside the specified structure. 
// `,