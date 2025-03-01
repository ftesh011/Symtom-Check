import { getAllDiagnoses } from "@/tasks";
import DiagnosesCard from "@/parts/diagnoses-card";

export default async function DiagnosesPage() {
    const diagnoses = await getAllDiagnoses();

    return (
        <div className="text-3xl font-bold font-serif mb-10">
            <h1>Diagnoses</h1>
                        
            <div className="grid grid-col gap-4 md:grid-cols-2
            lg:grid-cols-4">
                {diagnoses && diagnoses.map(diagnoses => (
                <DiagnosesCard key={diagnoses._id.toString()} diagnoses={diagnoses} /> 
                ))}
            </div>
        </div>

    )
}