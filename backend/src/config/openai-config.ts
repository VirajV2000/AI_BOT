import { GoogleGenerativeAI } from "@google/generative-ai";
export const configureAI=()=>{
    // Make sure to include these imports:
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    return genAI;

}