import { getDiagnosesViaID } from "@/tasks";
import { notFound } from "next/navigation";

type DiagnosesProps = {
    params: {
        id: string
    }
}

export default async function DiagnosesPage({params}: DiagnosesProps) {
    const {id} = params;
    const diagnoses = await getDiagnosesViaID(id);

    if (!diagnoses) notFound();

    const {diagnoses_content} = diagnoses;
    const diagnosesText = JSON.parse(diagnoses_content);
    console.log(diagnosesText);

    return (
    <div className="flex flex-col justify-center items-center p-24 lg:flex-row lg:gap-10">

        <div>Diagnoses</div>

        <div dangerouslySetInnerHTML={{__html: diagnosesText.
            diagnoses}}/>
    </div>)
}
