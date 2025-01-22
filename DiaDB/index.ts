import { MongoClient } from "mongodb";

if(!process.env.MONGODB_URI) {
    throw new Error('Invalid/Non-existent environment variable: "MONGODB"');
}

const uri = process.env.MONGODB_URI;
const options = { appName: "devrel.template.nextjs" };

let mdbclient: MongoClient;
if (process.env.NODE_ENV === "development") {
   // Node devlopment uses a global variable so that the 
   // preserved value is is across module reloads caused by HMR
   // (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClient?: MongoClient;
    };

    if (!globalWithMongo._mongoClient) {
       globalWithMongo._mongoClient = new MongoClient(uri, options);
    }
    mdbclient = globalWithMongo._mongoClient;
} else {
   // Global variable is not appropriate while in production mode 
    mdbclient = new MongoClient(uri,options);
}

// 
//

export default mdbclient;