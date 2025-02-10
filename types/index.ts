import { ObjectId } from "mongodb";

export type Diagnoses = {
    _id: ObjectId;
    title: string;
    diagnoses_content: string;
}
