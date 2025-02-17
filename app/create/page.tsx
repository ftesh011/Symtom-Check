"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import generateDiagnoses from "@/tasks/generateDiagnoses";
import { DiagnosesUserInput } from "@/types";

const exclusionsSelect = [
  { value: "not on medication", label: "Not on Medication"  },
  { value: "not pregnant", label: "Not Pregnant"  },


];



export default function CreatePage() {
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [diagnosesUserinput, setDiagnosesUserInput] = useState<DiagnosesUserInput>({
        age: '',
        gender: '',
        durationofsymptoms: '',
        severityofsymptoms: '',
        allergies: '',
        smoking: '',
        existingconditions: '',
        exposuretosickindividuals: '',
        userExclusions: []
    });

    const handleSubmit = async (e: FormEvent) => {
     try {
         e.preventDefault();
         setLoading(true);
         console.log(symptoms);
        await generateDiagnoses(symptoms, diagnosesUserinput);
     } catch (error) {
        console.log(error); 
     } finally{
         setLoading(false);
     }
    }
    

     const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
         const {value, checked} = e.target;
         
         setDiagnosesUserInput((prevState: DiagnosesUserInput) => ({
           ...prevState,
           userExclusions: checked 
             ? [...prevState.userExclusions, value]
             : prevState.userExclusions.filter(item => item !== value)
         }));
     };

     const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDiagnosesUserInput(prevState => {
            return{
               ...prevState,
               [e.target.name]: e.target.value
            };
        });
     };
    


    return(
        <div className="h-full bg-gradient-to-r from-green-200 to bg-red-700" >
            <h1 className="text-5xl font-mono pt-10 ml-5">Find the Diagnosis</h1>

             <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit} className="flex flex-col w-[50%] h-[50%]">
                    <label 
                    htmlFor="symptoms"
                    className="font-bold text-lg text-center underline mt-10"
                >
                    What symptoms are you experiencing?
                    </label>

                    <textarea 
                    onChange={(e) => setSymptoms(e.target.value.split(","))}
                    id="symptoms"
                    className="border mt-2 p-1 font-sans"
                    placeholder="Enter symptoms seperated by commas: (ex: fatigue, coughing sweating)"
                     required
                     disabled={loading}
                    />

                       {/*
                    <!-- Age -->
                    */}
                    <label htmlFor="age">Age</label>
                    <select id="age" name="age"
                    value={diagnosesUserinput.age}
                    onChange={handleChange}
                    >
                        <option value="" disabled >What age group are you in?</option>
                        <option value="0-5">0-5</option>
                        <option value="6-12">6-12</option>
                        <option value="13-30">13-30</option>
                        <option value="30-50">30-50</option>
                        <option value="50-65">50-65</option>
                        <option value="65 +">65 +</option>
                    </select>

                       {/*
                    <!-- Gender -->
                    */}
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender"
                    value={diagnosesUserinput.gender}
                    onChange={handleChange}
                    >
                        <option value="" disabled >What is your gender?</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>


                    {/*
                    <!-- Duration of Symptoms -->
                    */}
                    <label htmlFor="duration-of-symptoms">Duration of Symptoms</label>
                    <select id="duration-of-symptoms" name="durationofsymptoms"
                    value={diagnosesUserinput.durationofsymptoms}
                    onChange={handleChange}
                    >
                        <option value="" disabled >Choose how long you have had the symptoms</option>
                        <option value="1-2 days">1-2 days</option>
                        <option value="3-5 days">3-5 days</option>
                        <option value="6-10 days">6-10 days</option>
                        <option value="11-20 days">11-20 days</option>
                        <option value="21-30 days">21-30 days</option>
                        <option value="31-60 days">31-60 days</option>
                        <option value="more than 60 days">more than 60 days</option>
                    </select>
                    
                     {/*
                    <!-- Severity of Symptoms -->
                    */}
                    <label htmlFor="severity-of-symptoms">Severity of Symptoms</label>
                    <select id="severity-of-symptoms" name="severityofsymptoms"
                    value={diagnosesUserinput.severityofsymptoms}
                    onChange={handleChange}
                    >
                        <option value="" disabled >Choose how severe the symptoms are</option>
                        <option value="mild">mild</option>
                        <option value="moderate">moderate</option>
                        <option value="severe">severe</option>
                        <option value="very severe">very severe</option>
                        <option value="extremely severe">extremely severe</option>
                        <option value="constant">constant</option>
                    </select>

                    {/* lifestyle factors  */}

                    {/*
                    <!-- Allergies -->
                    */}
                    <label htmlFor="allergies">Allergies</label>
                    <select id="allergies" name="allergies"
                    value={diagnosesUserinput.allergies}
                    onChange={handleChange}
                    >
                        <option value="" disabled >If you have any allergies what type of allergies do you have</option>
                        {/* <option value="Milk">Milk</option>
                        <option value="Eggs">Peanuts</option>
                        <option value="Tree Nuts">Tree Nuts</option>
                        <option value="Soy">Soy</option>
                        <option value="Gluten">Gluten</option>
                        <option value="Fish">Fish</option>
                        <option value="Shellfish">mild</option>
                        <option value="Sesame">Sesame</option>
                        <option value="Mustard Seeds">Mustard Seeds</option>
                        <option value="Pollen">Pollen</option>
                        <option value="Dust Mites">Dust Mites</option>
                        <option value="Mold Spores">Mold Spores</option>
                        <option value="Pet Dander">Pet Dander</option>
                        <option value="Cockroach Droppings">Cockroach Droppings</option>
                        <option value="Feathers">Feathers</option> */}
                       <option value="Food Allergies">Food Allergies</option>
                       <option value="Seasonal Allergies">Seasonal Allergies</option>
                       <option value="Drug/Medical Allergies">Drug/Medical Allergies</option>
                       <option value="Skin Contact Allergies">Skin Contact Allergies</option>
                       <option value="Environmental Allergies">Environmental Allergies</option>
                       <option value="Insect Allergies">Insect Allergies</option>
                       <option value="Chemical Allergies">Chemical Allergies</option>
                    </select>

                    {/* {/*
                    <!-- Smoking History -->
                    */}
                    <label htmlFor="smoking">Smoking History</label>
                    <select id="smoking" name="smoking"
                    value={diagnosesUserinput.smoking}
                    onChange={handleChange}
                    >
                        <option value="" disabled >Do you smoke?</option>
                        <option value="Somker">Smoker</option>
                        <option value="Non-smoker">Non-smoker</option>
                        <option value="Former Smoker">Former Smoker</option>
                    </select> 

                    {/* {/*
                    <!-- Existing Conditions -->
                    */}
                    <label htmlFor="existing-conditions">Existing Conditions</label>
                    <select id="existing-conditions" name="existingconditions"
                    value={diagnosesUserinput.existingconditions}
                    onChange={handleChange}
                    >
                        <option value="" disabled >Do you have any existing conditions?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select> 

                       {/* {/*
                    <!-- Exposure to sick individuals -->
                    */}
                    <label htmlFor="exposure-to-sick-individuals">Exposure to sick individuals</label>
                    <select id="exposure-to-sick-individuals" name="exposuretosickindividuals"
                    value={diagnosesUserinput.exposuretosickindividuals}
                    onChange={handleChange}
                    >
                        <option value="" disabled >Have you been exposed to sick individuals with contagious illnesses?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select> 

                         {/* {/*
                    <!-- User exclusions -->
                    */}
                    <label htmlFor="user-exclusions">Please tick if it relates to you:</label>
                    {exclusionsSelect.map(option => (
                        <div key={option.value} id='user-exclusions'>
                            <input 
                                type="checkbox"
                                value={option.value}
                                checked={diagnosesUserinput.userExclusions.includes(option.value)}
                                onChange={handleCheckboxChange}
                            />
                            <label>{option.label}</label>
                        </div>
                    ))}





                    <input 
                    type="submit"
                    className={`mt-5 border rounded bg-green-500 text-white p-1 mx-5 md:mx-0
                    border-green-500 hover:border-green-950 hover:cursor-pointer ${loading && 'animate-pulse'}`}
                    value={loading ?'finding probable diagnoses...': 'submit'}
                    disabled={loading} 
                    />
                    <label className="bg-white-500 text-black p-1 mx-5 md:mx-0" >
                    We are tyring to provide you the best results so please be patient as we provide the results</label>
                </form>

             </div>

        </div>
    )
}