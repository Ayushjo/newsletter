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