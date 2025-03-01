'use server';

import mdbclient from "@/DiaDB";
import { ObjectId } from "mongodb";
import { Diagnoses } from "@/types";
import { getSession } from "@/hold/auth";

const db = mdbclient.db("Symptom-Check");

/**
 * Retrieve diagnoses via ID
 * 
 * @param id - The ID of the diagnoses to retrieve
 * @returns The diagnoses with the given ID
 */
export async function getDiagnosesViaID(id: string) {
    try {
      if(!ObjectId.isValid(id)){
        console.error("Invalid ID provided:", id);
        return null;
      }
      //  const db = await mdbclient.db("Symptom-Check");
        const diagnoses = await db
        .collection<Diagnoses>("diagnoses")
        .findOne({ _id: new ObjectId(id) });

    if (!diagnoses) {
            console.error(`Diagnoses were not found with this id: ${id}`);
            return null;
        }

      return diagnoses;
    } catch (error) {
        console.log("ERROR FETCHING DIAGNOESES", error);  
        return null;
    }
}

/**
 * Retrieve all diagnoses
 * 
 * @returns an array of diagnoses
 */
export async function getAllDiagnoses() {
    try {
      // User ID will be retrived from the session token
      const session =await getSession();
      if(!session?.user?.id){
        console.log("NO SESSION")
        return [];
      }
     //Put in place when diagnoses do match the current user id
      const diagnoses = await db.collection<Diagnoses>("diagnoses")
      .find({userid:session.user.id})
      .toArray();
    
      if (!diagnoses || diagnoses.length === 0) {
        console.log("0 diagnoeses for this user");
        return [];
      }
      return diagnoses;
    } catch (error) {
      console.log("ERROR FETCHING DIAGNOESES", error);
      return [];
    }

}




// /**
//  * Retrieve all diagnoses
//  * 
//  * @returns an array of diagnoses
//  */
// export async function getAllDiagnoses() {
//   try {
//     // User ID will be retrived from the session token
//     const session =await getSession();
//     const userid =session?.user?.id;

//     const diagnoses = await db.collection<Diagnoses>("diagnoses").find({userid: userid}).toArray();
  
//     if (!diagnoses) {
//       throw new Error("Error fetching diagnoses from database!");
//     }
//     return diagnoses;
//   } catch (error) {
//     console.log(error);
//   }

// }