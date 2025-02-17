import { ObjectId } from "mongodb";

export type Diagnoses = {
    _id: ObjectId;
    title: string;
    diagnoses_content: string;
}

export type DiagnosesUserInput = {
    age: string;
    gender: string;
    durationofsymptoms: string;
    severityofsymptoms: string;
    allergies: string;
    smoking: string;
    existingconditions: string;
    exposuretosickindividuals: string;
    userExclusions: string[];
};

