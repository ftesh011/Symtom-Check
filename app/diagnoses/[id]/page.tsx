import { getDiagnosesViaID } from "@/tasks";
import Link from "next/link";
import { notFound } from "next/navigation";

type DiagnosesProps = {
    params: {
        id: string
    }
}

interface Diagnosis {
  title: string;
  diagnosis: string;  // Changed from description to diagnosis to match the data
}

interface DiagnosesData {
  diagnoses: Diagnosis[];
}

export default async function DiagnosesPage({params}: DiagnosesProps) {
    const {id} = params;
    const diagnoses = await getDiagnosesViaID(id);

    if (!diagnoses) notFound();

    const {diagnoses_content} = diagnoses;
    const diagnosesData: DiagnosesData = JSON.parse(diagnoses_content);
    console.log(diagnosesData);

    return (
    <div className="container mx-auto p-4">

    <Link href='/diagnoses2' className="text-lg font-Light hover:underline">Go back to your diagnoses</Link>


        <h1 className="text-2xl font-bold mt-10">Your Diagnoses</h1>
        <div className="space-y-6">

            {diagnosesData.diagnoses.map((diagnosis, index) => (
                <div key={index} className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">{diagnosis.title}</h2>
                    <div 
                        className="mt-2"
                        dangerouslySetInnerHTML={{ __html: diagnosis.diagnosis }}
                    />
                </div>
            ))}
        </div>
    </div>)
}
