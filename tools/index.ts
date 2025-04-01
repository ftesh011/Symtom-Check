import { DiagnosesUserInput } from "@/types";

// Help function
// Grabs each key which will run rejects to find uppercases
// Will then replace it with a space
// 2nd first letter will make the first letter uppercase

const formatKey = (key: string) => {
    return key
        // Handle common compound words first - match the whole word
        .replace(/symptoms/gi, 'symptoms')
        .replace(/ofsymptoms/gi, ' of symptoms')
        .replace(/tosick/gi, ' to sick ')
        .replace(/individuals/gi, 'individuals')
        .replace(/existing/gi, ' existing')
        .replace(/conditions/gi, ' conditions')
        // Then handle remaining cases
        .replace(/([A-Z])/g, ' $1')
        // Clean up any double spaces and trim
        .replace(/\s+/g, ' ')
        .trim()
        // Make first letter uppercase, rest lowercase
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
        of the symptoms and reccomend these medical products:[Acetaminophen,Ibuprofen,Naproxen,Paracetamol,Aspirin,Acid reducers,
        Antifungal Cream,Hydrocortisone Cream,Loperamide,Meclizine,Fibersupplements,Laxatives,Probiotics,Electrolyte fluids,
        Melatonin,Bismuth Subsalicylate,Activated Charcoal,Topical pain relievers,Oral Anesthetic,Aloe Vera Gel] which are the most likely to help. Each 
        diagnosis decription should be less than 500 words and more than 200 words:\n`,
        ...symptoms,
        'Make sure the diagnoeses use the following details:\n',
        //Make sure the diagnoses follows the following preferences\n
    ];
    // Loop over the diagnoses imputs by user add exclusions/inputs to array 
     Object.entries(diagnosesUserinput).forEach(([key, value]) =>{
        if(Array.isArray(value) && value.length > 0) {
            promptSegments.push(`User Exclusions: ${value.join(', ')}\n`)
        } else {
            // Skip formatting for userExclusions key
            const formattedKey = key === 'userExclusions' ? key : formatKey(key);
            promptSegments.push(`${formattedKey}: ${value}\n\n`)  // Added extra \n for spacing
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
