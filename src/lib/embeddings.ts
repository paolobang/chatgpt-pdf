//import { OpenAIApi, Configuration } from "openai-edge";
import OpenAI from "openai";

const openai = new OpenAI();

export async function getEmbeddings(text: string){
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: text.replace(/\n/g, " "),
        });
        //console.log('openai embedding',response);
        const result = await response;
        return result.data[0].embedding as number[];
    } catch(error){
        console.log("Error con OpenAI")
        throw error;
    }

}