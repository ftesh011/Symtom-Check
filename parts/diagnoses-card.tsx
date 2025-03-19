import { Diagnoses } from "@/types";
import Image from "next/image";
import Link from "next/link";
type DiagnosesCardProps = {
    diagnoses: Diagnoses;
}


export default function DiagnosesCard({diagnoses}: DiagnosesCardProps) {
    const {diagnoses_content,title,_id,createdAt} = diagnoses;

    return (
       <Link href={`/diagnoses/${_id}`} className='border-4 hover:bg-blue-900 disabled:opacity-50 rounded-lg p-4 m-2'>
        <h2 className="text-xl font-bold text-blue-900 mb-4">{title}</h2>

        <div className="p-5 text-blue-800 font-semibold">
            <p>Probable Diagnoses results:{new Date(createdAt).toLocaleDateString("en-GB")}</p>
        </div>
      </Link>

    )
} 

