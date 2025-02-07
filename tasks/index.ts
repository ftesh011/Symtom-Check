'use server';

import mdbclient from "@/DiaDB";
import { ObjectId } from "mongodb";
import { Diagnoses } from "@/types";

export async function getDiagnosesViaID(id: string) {
    try {
        const db = await mdbclient.db("Symptom-Check");
        const diagnoses = await db
        .collection<Diagnoses>("diagnoses")
        .findOne({ _id: ObjectId.createFromHexString(id) });

    if (!diagnoses) {
            throw new Error(`Diagnoses were not found with this id: ${id}`);
        }

      return diagnoses;
    } catch (error) {
        console.log(error);
    }
}