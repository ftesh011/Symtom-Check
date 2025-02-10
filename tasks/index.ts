'use server';

import mdbclient from "@/DiaDB";
import { ObjectId } from "mongodb";
import { Diagnoses } from "@/types";

const db = mdbclient.db("Symptom-Check");

/**
 * Retrieve diagnoses via ID
 * 
 * @param id - The ID of the diagnoses to retrieve
 * @returns The diagnoses with the given ID
 */
export async function getDiagnosesViaID(id: string) {
    try {
      //  const db = await mdbclient.db("Symptom-Check");
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

/**
 * Retrieve all diagnoses
 * 
 * @returns an array of diagnoses
 */
export async function getAllDiagnoses() {
    try {

      const diagnoses = await db.collection<Diagnoses>("diagnoses").find().toArray();
    
      if (!diagnoses) {
        throw new Error("Error fetching diagnoses from database!");
      }
      return diagnoses;
    } catch (error) {
      console.log(error);
    }

}