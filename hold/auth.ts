import { cookies } from "next/headers";
import { sign, verify } from "jsonwebtoken"
import { env } from "process";
import { ObjectId } from "mongodb";

export async function getSession() {
    try{
        const cookiesStore = cookies();
        const token = cookiesStore.get("session"); 

        if (!token) {
            console.log("No token found");
            return null;
        }

        const decoded = verify(
            token.value,
            process.env.JWT_SECRET || "secret"
        ) as { userid: string };

        if(!decoded || (!decoded.userid)){
            console.error("Invalid user ID found in token:", decoded.userid);
            return null;
        }

        return{
            user:{
                id: decoded.userid, 
                name: "Test1 User"
            }
        };
    }catch(error){
        console.error("Session verfication failure and error:", error);
        return null;
    }
}

// For new users who are just signing up 
// a token will be created for them 
// the toke is exclusive to the user and will be used
// when they log back in

export async function createSession(userId: string) {
    // The creation of the token when user is signs in 
    const token = sign(
        {userid: userId},
        process.env.JWT_SECRET || "secret",
        {expiresIn: "24h"}
    );
    
    // Storage
    const cookiesStore = cookies();
    cookiesStore.set("session", token, {
        httpOnly: true, // secure
        secure: process.env.NODE_ENV === "production", // secure
        sameSite: "strict", // not for cross platform authorization
        maxAge: 86400 // 24 hours span 
    });
    return {
        sessionToken: token,
        userid: userId
    };
}

//When user comes back in via the log in  validation 
// will take place to asure that it is the correct token 
// (which mean it it the correct user) and to see if the
// token is still in operation

export async function validateSession(sessionToken: string) {
    try{
        //exaime token to see if it is still in operation
        const decoded = verify(
            sessionToken,
            process.env.JWT_SECRET || "secret"
        ) as {userid: string};
        return true;
    } catch(error){
        console.error("Session validation failure and error:", error);
        return false;
    }
}





// // In auth.ts the aim is to create a session token for the user that will 
// // be used when user are logged in. Each time the user gets their diagnoses
// // results the session tokwee will retrieve the data.
// // the other purpose will be to validate the user to their correct diagnoses

// // You might want to replace this with a more robust solution like NextAuth.js later

// export async function getSession() {
//     // For now, return a mock session
//     // Would verify the session token from cookies/localStorage
//     return {
//         user: {
//             id: "user123", // This would normally come from your authentication system
//             name: "Test User"
//         }
//     };
// } 

// export async function createSession(userId: string) {
//     // This would normally:
//     // 1. Create a session token
//     // 2. Store it in a database
//     // 3. Set it in a cookie or localStorage
//     return {
//         sessionToken: "some-secure-token",
//         userId: userId
//     };
// }

// export async function validateSession(sessionToken: string) {
//     // This would normally:
//     // 1. Verify the session token is valid
//     // 2. Check if it's expired
//     // 3. Return the associated user data
//     return true;
// }