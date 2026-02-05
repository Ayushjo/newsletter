import client from "../../prisma/client"
import { createRandomToken } from "../utils/createRandomToken"
export const upsertSubscriber = async(email: string) => {
    try {
        const subscriber = await client.newsLetterSubscriber.upsert({
            where: {
                email
            },
            update: {
                token:createRandomToken(),
                confirmed:false,
                active:false
            },
            create: {
                email,
                token:createRandomToken(),
                confirmed:false,
                active:false
            }
        })

        return subscriber
        
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
        
    }
}

export const verifySubscriber = async(token:any,email:any) => {
    try {
        const subscriber = await client.newsLetterSubscriber.update({
            where: {
                email,
                token:token
            },
            data: {
                confirmed: true,
                active: true,
                token:""
            }
        })
        if(!subscriber){
            throw new Error("Subscriber not found");
        }

        return subscriber
        
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
        
    }
}