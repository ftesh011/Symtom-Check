import { Diagnoses } from "@/types";
import Image from "next/image";
import Link from "next/link";
type DiagnosesCardProps = {
    diagnoses: Diagnoses;
}


export default function DiagnosesCard({diagnoses}: DiagnosesCardProps) {
    const {diagnoses_content,title,_id} = diagnoses;

    return (
       <Link href={`/diagnoses/${_id}`} className='flex flex-col border rounded
       hover:scale-105 hover:transtion hover:ease-in-out hover:delay-150'>
        <h2>{title}</h2>

        <div>
            <Image
            src='/Ill_Lady.jpg'
            alt={title}
            width={400}
            height={400}
            sizes="100vw"
            style={{width: '100%', height: '100%'}}
            />
        </div>
      </Link>

    )
} 



{/* <div>
<p>{diagnoses_content}</p>
</div> */}