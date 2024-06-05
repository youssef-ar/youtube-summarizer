import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config(/*{ path: '../.env' }*/);

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
export async function getSummarization(subtitle) {
    const chatCompletion = await getGroqChatCompletion(subtitle);
    return(chatCompletion.choices[0]?.message?.content || "");
}
async function getGroqChatCompletion(subtitle) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `You are a brilliant assistant, and your task is to summarize the provided text in less than 200 words.
                Ensure that the sentences are connected to form a continuous discourse.
                here's the text: ${subtitle}
                `
            }
        ],
        model: "llama3-8b-8192"
    });
}

