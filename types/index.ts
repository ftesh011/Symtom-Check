import { ObjectId } from "mongodb";

export type Diagnoses = {
    _id: ObjectId;
    diagnoses_content: string;
}
